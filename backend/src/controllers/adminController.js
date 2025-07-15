const User = require('../models/User');

class AdminController {
  static async getAllUsers(req, res) {
    try {
      const { limit = 50, offset = 0 } = req.query;
      
      const users = await User.getAllUsers(parseInt(limit), parseInt(offset));
      
      res.json({
        users,
        total: users.length,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user });

    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  static async deactivateUser(req, res) {
    try {
      const { id } = req.params;
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      if (parseInt(id) === req.user.id) {
        return res.status(400).json({ error: 'Cannot deactivate your own account' });
      }

      await User.deactivateUser(id);
      
      res.json({ message: 'User deactivated successfully' });

    } catch (error) {
      console.error('Deactivate user error:', error);
      res.status(500).json({ error: 'Failed to deactivate user' });
    }
  }

  static async createUser(req, res) {
    try {
      const { registerSchema } = require('../utils/validation');
      const { error, value } = registerSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { username, email, password, role } = value;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
      }

      // Create new user
      const newUser = await User.create({ username, email, password, role });

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role
        }
      });

    } catch (error) {
      console.error('Create user error:', error);
      
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Username or email already exists' });
      }
      
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  static async getSystemStats(req, res) {
    try {
      const { pool } = require('../utils/database');

      const [usersCount, reportsCount, violationsCount, activeUsersCount] = await Promise.all([
        pool.query('SELECT COUNT(*) FROM users'),
        pool.query('SELECT COUNT(*) FROM reports'),
        pool.query('SELECT COUNT(*) FROM violations'),
        pool.query('SELECT COUNT(*) FROM users WHERE is_active = true')
      ]);

      res.json({
        stats: {
          totalUsers: parseInt(usersCount.rows[0].count),
          activeUsers: parseInt(activeUsersCount.rows[0].count),
          totalReports: parseInt(reportsCount.rows[0].count),
          totalViolations: parseInt(violationsCount.rows[0].count)
        }
      });

    } catch (error) {
      console.error('Get system stats error:', error);
      res.status(500).json({ error: 'Failed to fetch system statistics' });
    }
  }
}

module.exports = AdminController;
