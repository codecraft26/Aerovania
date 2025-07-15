const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Pool } = require('pg');
const Joi = require('joi');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/drone_analytics',
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/json') {
      cb(null, true);
    } else {
      cb(new Error('Only JSON files are allowed'), false);
    }
  }
});

// Validation schema
const violationSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().required(),
  timestamp: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  image_url: Joi.string().uri().required()
});

const reportSchema = Joi.object({
  drone_id: Joi.string().required(),
  date: Joi.string().required(),
  location: Joi.string().required(),
  violations: Joi.array().items(violationSchema).required()
});

// Initialize database on startup
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        drone_id VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        location VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS violations (
        id SERIAL PRIMARY KEY,
        report_id INTEGER REFERENCES reports(id) ON DELETE CASCADE,
        violation_id VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        timestamp TIME NOT NULL,
        latitude DECIMAL(10, 8) NOT NULL,
        longitude DECIMAL(11, 8) NOT NULL,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Routes

// Root health check with database connectivity test
app.get('/', async (req, res) => {
  try {
    // Test database connection
    const result = await pool.query('SELECT NOW() as db_time');
    
    res.json({
      status: 'OK',
      service: 'Drone Analytics API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        timestamp: result.rows[0].db_time
      },
      endpoints: {
        health: '/api/health',
        upload: '/api/upload',
        violations: '/api/violations',
        kpis: '/api/kpis',
        filters: '/api/filters'
      }
    });
  } catch (error) {
    console.error('Health check database error:', error);
    res.status(503).json({
      status: 'ERROR',
      service: 'Drone Analytics API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      database: {
        status: 'disconnected',
        error: error.message
      }
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Upload JSON report
app.post('/api/upload', upload.single('report'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const reportData = JSON.parse(req.file.buffer.toString());
    const { error, value } = reportSchema.validate(reportData);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert report
      const reportResult = await client.query(
        'INSERT INTO reports (drone_id, date, location) VALUES ($1, $2, $3) RETURNING id',
        [value.drone_id, value.date, value.location]
      );
      
      const reportId = reportResult.rows[0].id;
      
      // Insert violations
      for (const violation of value.violations) {
        await client.query(
          'INSERT INTO violations (report_id, violation_id, type, timestamp, latitude, longitude, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [reportId, violation.id, violation.type, violation.timestamp, violation.latitude, violation.longitude, violation.image_url]
        );
      }
      
      await client.query('COMMIT');
      
      res.json({ 
        message: 'Report uploaded successfully', 
        reportId,
        violationsCount: value.violations.length 
      });
      
    } catch (dbError) {
      await client.query('ROLLBACK');
      throw dbError;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to process upload' });
  }
});

// Get all violations with filters
app.get('/api/violations', async (req, res) => {
  try {
    const { drone_id, date, type, limit = 1000 } = req.query;
    
    let query = `
      SELECT 
        v.violation_id,
        v.type,
        v.timestamp,
        v.latitude,
        v.longitude,
        v.image_url,
        r.drone_id,
        r.date,
        r.location,
        v.created_at
      FROM violations v
      JOIN reports r ON v.report_id = r.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (drone_id) {
      params.push(drone_id);
      query += ` AND r.drone_id = $${++paramCount}`;
    }
    
    if (date) {
      params.push(date);
      query += ` AND r.date = $${++paramCount}`;
    }
    
    if (type) {
      params.push(type);
      query += ` AND v.type = $${++paramCount}`;
    }
    
    query += ` ORDER BY r.date DESC, v.timestamp DESC LIMIT $${++paramCount}`;
    params.push(limit);
    
    const result = await pool.query(query, params);
    res.json(result.rows);
    
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Failed to fetch violations' });
  }
});

// Get KPI statistics
app.get('/api/kpis', async (req, res) => {
  try {
    const { drone_id, date } = req.query;
    
    let whereClause = 'WHERE 1=1';
    const params = [];
    let paramCount = 0;
    
    if (drone_id) {
      params.push(drone_id);
      whereClause += ` AND r.drone_id = $${++paramCount}`;
    }
    
    if (date) {
      params.push(date);
      whereClause += ` AND r.date = $${++paramCount}`;
    }
    
    // Total violations
    const totalResult = await pool.query(`
      SELECT COUNT(*) as total
      FROM violations v
      JOIN reports r ON v.report_id = r.id
      ${whereClause}
    `, params);
    
    // Violations by type
    const typeResult = await pool.query(`
      SELECT v.type, COUNT(*) as count
      FROM violations v
      JOIN reports r ON v.report_id = r.id
      ${whereClause}
      GROUP BY v.type
      ORDER BY count DESC
    `, params);
    
    // Violations by drone
    const droneResult = await pool.query(`
      SELECT r.drone_id, COUNT(*) as count
      FROM violations v
      JOIN reports r ON v.report_id = r.id
      ${whereClause}
      GROUP BY r.drone_id
      ORDER BY count DESC
    `, params);
    
    // Violations by location
    const locationResult = await pool.query(`
      SELECT r.location, COUNT(*) as count
      FROM violations v
      JOIN reports r ON v.report_id = r.id
      ${whereClause}
      GROUP BY r.location
      ORDER BY count DESC
    `, params);
    
    // Violations over time
    const timeResult = await pool.query(`
      SELECT r.date, COUNT(*) as count
      FROM violations v
      JOIN reports r ON v.report_id = r.id
      ${whereClause}
      GROUP BY r.date
      ORDER BY r.date
    `, params);
    
    res.json({
      total: parseInt(totalResult.rows[0].total),
      byType: typeResult.rows,
      byDrone: droneResult.rows,
      byLocation: locationResult.rows,
      overTime: timeResult.rows
    });
    
  } catch (error) {
    console.error('KPI error:', error);
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
});

// Get unique filter values
app.get('/api/filters', async (req, res) => {
  try {
    const droneIds = await pool.query('SELECT DISTINCT drone_id FROM reports ORDER BY drone_id');
    const dates = await pool.query('SELECT DISTINCT date FROM reports ORDER BY date DESC');
    const types = await pool.query('SELECT DISTINCT type FROM violations ORDER BY type');
    
    res.json({
      droneIds: droneIds.rows.map(row => row.drone_id),
      dates: dates.rows.map(row => row.date),
      types: types.rows.map(row => row.type)
    });
    
  } catch (error) {
    console.error('Filters error:', error);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function startServer() {
  await initDatabase();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);