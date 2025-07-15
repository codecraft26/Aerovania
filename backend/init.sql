-- backend/init.sql
-- Create database tables

CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    drone_id VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reports_drone_id ON reports(drone_id);
CREATE INDEX IF NOT EXISTS idx_reports_date ON reports(date);
CREATE INDEX IF NOT EXISTS idx_violations_type ON violations(type);
CREATE INDEX IF NOT EXISTS idx_violations_report_id ON violations(report_id);