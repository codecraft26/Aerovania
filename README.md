# AI Analytics Dashboard - Drone Safety Monitoring

A full-stack web application that simulates an AI-powered drone analytics dashboard for monitoring safety violations. This platform ingests daily AI reports in JSON format, stores and visualizes data, plots geotagged violations on a map, and displays KPIs and analytics.

## 🚀 Features

### 1. 🔐 Authentication System
- User registration and login with JWT tokens
- Role-based access control (Admin/User)
- Secure password hashing with bcryptjs
- Profile management and password change
- Protected routes and API endpoints
- Token refresh mechanism
- Session management with local storage

### 2. Upload Interface
- Upload .json AI reports with validation
- Real-time file processing and storage
- Support for multiple violation types
- Error handling with detailed feedback
- **Requires Authentication:** Users must be logged in to upload reports

### 3. Dashboard View
**KPI Cards:**
- Total violations count
- Violations by type distribution
- Active drone monitoring
- Location coverage metrics
- **Protected View:** Only accessible to authenticated users

**Charts:**
- Pie chart showing violation type distribution
- Bar chart displaying violations by drone
- Time series showing violations over time
- Interactive tooltips and legends

### 4. Map View
- Interactive map with violation markers
- Color-coded markers by violation type
- Popup information showing violation details
- Static boundary polygon overlay
- Marker clustering for better performance
- Evidence image preview in popups

### 5. Table View
- Sortable columns for all violation data
- Real-time search functionality
- CSV export capability
- Pagination for large datasets
- Responsive design for mobile devices

### 6. Advanced Filtering
- Filter by Drone ID
- Filter by Date range
- Filter by Violation Type
- Clear individual or all filters
- Active filter indicators

### 7. User Management
- User profile viewing and editing
- Password change functionality
- Role-based feature access
- Secure logout with token cleanup

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **Authentication** | JWT tokens, bcryptjs, React Context |
| **Charts** | Recharts |
| **Maps** | Leaflet.js with OpenStreetMap tiles |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL with user authentication tables |
| **Security** | JWT authentication, password hashing, rate limiting |
| **Container** | Docker + docker-compose |
| **Icons** | Lucide React |
| **Deployment** | Frontend: Vercel, Backend: Digital Ocean |
| **SSL/Domain** | HTTPS on Vercel and custom domain |

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the unified repository:**
   ```bash
   git clone https://github.com/codecraft26/Aerovania.git
   cd Aerovania
   ```

2. **Start the application:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: PostgreSQL on port 5432

## 🌐 Live Deployment

The application is deployed and accessible at:
- **Frontend:** https://aeroniva-frontend.vercel.app/
- **Backend API:** https://backend.otito.in
- **Database:** PostgreSQL hosted on Digital Ocean

### Repository Structure
- **Unified Repository:** [Aerovania](https://github.com/codecraft26/Aerovania) - Contains both frontend and backend
- **Legacy Frontend Repository:** [aeroniva-frontend](https://github.com/codecraft26/aeroniva-frontend) - Separate frontend repo (deprecated)

### Deployment Infrastructure
- **Platform:** Frontend on Vercel, Backend on Digital Ocean Droplets
- **Frontend:** Next.js application deployed on Vercel from unified repository
- **Backend:** Node.js/Express API server with HTTPS configuration on Digital Ocean
- **Database:** PostgreSQL database hosted on Digital Ocean with user authentication tables
- **SSL:** HTTPS enabled for secure connections on both platforms

### Manual Setup (Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/codecraft26/Aerovania.git
   cd Aerovania
   ```

2. **Database Setup:**
   ```bash
   # Start PostgreSQL using Docker
   docker run --name postgres-db -e POSTGRES_DB=drone_analytics -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
   ```

3. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Frontend Setup:**
   ```bash
   # Open a new terminal and navigate to frontend
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 📁 Project Structure

### Current Unified Repository Structure
```
Aerovania/
├── docker-compose.yml                    # Docker orchestration
├── sample_report.json                    # Sample data for testing
├── sample_report_zone_a_day2.json        # Zone A day 2 sample data
├── sample_report_zone_b.json             # Zone B sample data
├── sample_report_zone_c.json             # Zone C sample data
├── sample_report_zone_d.json             # Zone D sample data
├── sample_report_zone_e.json             # Zone E sample data
├── sample_test_report.json               # Test report sample
├── test_upload.json                      # Test upload sample
├── upload_sample_reports.sh              # Script to upload all samples with auth
├── README.md                             # Project documentation
├── backend/                              # Backend API server
│   ├── .env                             # Environment variables
│   ├── .env.example                     # Environment template
│   ├── .gitignore                       # Git ignore rules
│   ├── Dockerfile                       # Backend container config
│   ├── README.md                        # Backend documentation
│   ├── init.sql                         # Database initialization
│   ├── migrate.js                       # Database migration script
│   ├── package.json                     # Backend dependencies
│   ├── server.js                        # Main Express server
│   ├── server-optimized.js             # Optimized server version
│   └── src/                             # Source code
│       ├── controllers/                 # Request handlers
│       │   ├── authController.js        # Authentication controller
│       │   └── reportController.js      # Reports controller
│       ├── middleware/                  # Middleware functions
│       │   ├── auth.js                  # JWT authentication middleware
│       │   └── rateLimiter.js           # Rate limiting middleware
│       ├── models/                      # Database models
│       │   ├── User.js                  # User model with auth methods
│       │   └── Report.js                # Report model
│       ├── routes/                      # API route definitions
│       │   ├── auth.js                  # Authentication routes
│       │   └── reports.js               # Reports routes
│       └── utils/                       # Utility functions
│           ├── database.js              # Database connection
│           ├── jwt.js                   # JWT token utilities
│           └── validation.js            # Input validation schemas
└── frontend/                            # Frontend Next.js application
    ├── .eslintrc.json                   # ESLint configuration
    ├── .gitignore                       # Git ignore rules
    ├── dockerfile                       # Frontend container config
    ├── next-env.d.ts                    # Next.js type definitions
    ├── next.config.ts                   # Next.js configuration
    ├── package.json                     # Frontend dependencies
    ├── postcss.config.js                # PostCSS configuration
    ├── postcss.config.mjs               # PostCSS module configuration
    ├── tailwind.config.js               # Tailwind CSS config
    ├── tsconfig.json                    # TypeScript config
    ├── public/                          # Static assets
    │   ├── file.svg                     # File icon
    │   ├── globe.svg                    # Globe icon
    │   ├── next.svg                     # Next.js logo
    │   ├── vercel.svg                   # Vercel logo
    │   └── window.svg                   # Window icon
    └── src/                             # Source code
        ├── app/                         # Next.js app directory
        │   ├── dashboard/               # Dashboard page
        │   │   └── page.tsx             # Dashboard route
        │   ├── login/                   # Login page
        │   │   └── page.tsx             # Login route
        │   ├── favicon.ico              # App favicon
        │   ├── globals.css              # Global styles
        │   ├── layout.tsx               # Root layout
        │   ├── page.tsx                 # Main page
        │   ├── page_new.tsx             # New page variant
        │   └── page_old.tsx             # Old page variant
        ├── components/                  # React components
        │   ├── AuthWrapper.tsx          # Authentication wrapper
        │   ├── Dashboard.tsx            # Dashboard with KPIs and charts
        │   ├── FilterPanel.tsx          # Filtering component
        │   ├── Login.tsx                # Login form component
        │   ├── Register.tsx             # Registration form component
        │   ├── Map.tsx                  # Leaflet map component
        │   ├── MapView.tsx              # Map view wrapper
        │   ├── TableView.tsx            # Data table component
        │   ├── UploadForm.tsx           # File upload component
        │   ├── charts.tsx               # Chart components
        │   └── icons.tsx                # Icon components
        ├── contexts/                    # React contexts
        │   └── AuthContext.tsx          # Authentication context
        └── utils/                       # Utility functions
            ├── api.ts                   # API utility functions with auth
            └── types.ts                 # TypeScript type definitions
```

## 🔧 API Endpoints

### Authentication Endpoints

#### Public Authentication Routes
- `POST /api/auth/register` - User registration
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com", 
    "password": "securePassword123",
    "role": "user"
  }
  ```

- `POST /api/auth/login` - User login
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```

- `POST /api/auth/refresh-token` - Refresh access token
  ```json
  {
    "refreshToken": "your_refresh_token_here"
  }
  ```

#### Protected Authentication Routes (Require Bearer Token)
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - User logout

### Upload (Protected)
- `POST /api/upload` - Upload JSON report file (Requires Authentication)

### Data Retrieval (Protected)
- `GET /api/violations` - Get violations with optional filters (Requires Authentication)
- `GET /api/kpis` - Get KPI statistics (Requires Authentication)
- `GET /api/filters` - Get available filter options (Requires Authentication)
- `GET /api/health` - Health check endpoint (Public)

### Query Parameters
- `drone_id` - Filter by drone ID
- `date` - Filter by date (YYYY-MM-DD)
- `type` - Filter by violation type
- `limit` - Limit number of results

### Example API Usage

```bash
# Register a new user (Local development)
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"securePassword123","role":"user"}' \
  http://localhost:8000/api/auth/register

# Login user (Local development)
curl -X POST -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securePassword123"}' \
  http://localhost:8000/api/auth/login

# Register a new user (Production)
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"securePassword123","role":"user"}' \
  https://backend.otito.in/api/auth/register

# Login user (Production)
curl -X POST -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securePassword123"}' \
  https://backend.otito.in/api/auth/login

# Get user profile (requires JWT token)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://backend.otito.in/api/auth/profile

# Upload a report with authentication (Local development)
curl -X POST -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "report=@sample_report.json" http://localhost:8000/api/upload

# Upload a report with authentication (Production)
curl -X POST -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "report=@sample_report.json" https://backend.otito.in/api/upload

# Get violations for a specific drone with authentication (Local)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:8000/api/violations?drone_id=DRONE_ZONE_1"

# Get violations for a specific drone with authentication (Production)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "https://backend.otito.in/api/violations?drone_id=DRONE_ZONE_1"

# Get KPIs for a specific date with authentication (Production)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "https://backend.otito.in/api/kpis?date=2025-07-10"
```

## 📊 Sample Data Format

The repository includes multiple sample JSON files for testing different scenarios:

### Available Sample Files
- **`sample_report.json`** - Basic sample with standard violation data
- **`sample_report_zone_a_day2.json`** - Zone A data for day 2 testing
- **`sample_report_zone_b.json`** - Zone B specific violation data
- **`sample_report_zone_c.json`** - Zone C specific violation data
- **`sample_report_zone_d.json`** - Zone D specific violation data
- **`sample_report_zone_e.json`** - Zone E specific violation data
- **`sample_test_report.json`** - Test report for validation scenarios
- **`test_upload.json`** - Additional test data for various scenarios

### Sample Data Structure
```json
{
  "drone_id": "DRONE_ZONE_1",
  "date": "2025-07-10",
  "location": "Zone A",
  "violations": [
    {
      "id": "v1",
      "type": "Fire Detected",
      "timestamp": "10:32:14",
      "latitude": 23.74891,
      "longitude": 85.98523,
      "image_url": "https://via.placeholder.com/150"
    }
  ]
}
```

### Bulk Upload Script
Use the provided script to upload all sample files at once:
```bash
# Make the script executable
chmod +x upload_sample_reports.sh

# Upload all sample files to local development
./upload_sample_reports.sh

# Or upload to production
BACKEND_URL=https://backend.otito.in ./upload_sample_reports.sh
```

## 🗺️ Map Features

- **Interactive Markers:** Click to view violation details
- **Color Coding:**
  - 🔴 Red: Fire Detected
  - 🟠 Orange: Unauthorized Person
  - 🟡 Yellow: No PPE Kit
  - 🔵 Blue: Other Violations
- **Boundary Overlay:** Static safety zone polygon
- **Evidence Images:** Preview images in marker popups

## 📈 Dashboard Analytics

- **Real-time KPIs:** Total violations, types, drones, locations
- **Interactive Charts:** Hover for detailed information
- **Time Series:** Track violations over time
- **Distribution Analysis:** Understand violation patterns

## 🔍 Search and Filter

- **Multi-level Filtering:** Combine drone, date, and type filters
- **Real-time Search:** Search across all violation data
- **Export Functionality:** Download filtered data as CSV
- **Sort Options:** Sort by any column in ascending/descending order

## 🚨 Environment Variables

Create `.env` files for local development:

**Backend (.env):**
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/drone_analytics
DB_HOST=localhost
DB_PORT=5432
DB_NAME=drone_analytics
DB_USER=postgres
DB_PASSWORD=password

# JWT Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_REFRESH_SECRET=your_super_secure_refresh_secret_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Server Configuration
CORS_ORIGINS=http://localhost:3000
PORT=8000
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_BASE=http://localhost:8000/api
```

### Production Environment

**Backend (.env.production):**
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@database-host:5432/drone_analytics

# JWT Authentication
JWT_SECRET=your_production_jwt_secret_key_here
JWT_REFRESH_SECRET=your_production_refresh_secret_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Server Configuration
CORS_ORIGINS=https://aeroniva-frontend.vercel.app
PORT=8000
NODE_ENV=production
SSL_ENABLED=true

# Frontend URL for CORS
FRONTEND_URL=https://aeroniva-frontend.vercel.app
```

**Frontend (.env.production):**
```env
NEXT_PUBLIC_API_BASE=https://backend.otito.in/api
```

## 🧪 Testing the Application

### Authentication Testing
1. **Register a new user** by visiting the registration page
2. **Login with credentials** to access the protected dashboard
3. **Test protected routes** - try accessing dashboard without login
4. **Test JWT tokens** - verify tokens are stored and used correctly
5. **Test profile management** - update profile and change password
6. **Test logout functionality** - ensure tokens are cleared properly

### Local Testing
1. **Start the application** using `docker-compose up --build`
2. **Navigate to** http://localhost:3000
3. **Register/Login** to access the dashboard
4. **Upload sample files** using any of the provided sample JSON files:
   - `sample_report.json` - Basic testing
   - `sample_report_zone_*.json` - Multi-zone testing
   - `sample_test_report.json` - Validation testing
   - `test_upload.json` - Additional test data
5. **Use the bulk upload script** to test with all samples: `./upload_sample_reports.sh`
6. **Explore the dashboard** to see KPIs and charts
7. **View the map** to see violation locations across different zones
8. **Use the table view** to search and filter data

### Production Testing
1. **Visit the live application** at https://aeroniva-frontend.vercel.app/
2. **Create an account or login** to access the features
3. **Upload sample data** using any of the provided sample JSON files:
   - Test different zones with zone-specific samples
   - Test validation with `sample_test_report.json`
   - Test edge cases with `test_upload.json`
4. **Test all features** including dashboard, map view, and table view
5. **Verify API endpoints** using https://backend.otito.in/api/health
6. **Test authentication flows** - registration, login, logout, and profile management

## 🎯 Bonus Features Implemented

- ✅ **Complete Authentication System** with JWT tokens and role-based access
- ✅ **Secure Password Management** with bcryptjs hashing and change functionality
- ✅ **Protected Routes** on both frontend and backend
- ✅ **Token Refresh Mechanism** for seamless user experience
- ✅ **Live refresh** for new uploads with automatic data reload
- ✅ **Advanced search** with real-time filtering across all fields
- ✅ **Export functionality** with CSV download
- ✅ **Responsive design** optimized for all device sizes
- ✅ **Interactive maps** with custom markers and popups
- ✅ **Real-time validation** for uploaded JSON files
- ✅ **Production deployment** on Digital Ocean with HTTPS
- ✅ **Custom domain** configuration for secure access
- ✅ **Cloud database** hosting for reliable data storage
- ✅ **Rate Limiting** for security and API protection

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts:**
   ```bash
   # Check if ports are in use
   lsof -i :3000
   lsof -i :8000
   lsof -i :5432
   ```

2. **Database connection issues:**
   ```bash
   # Reset the database
   docker-compose down -v
   docker-compose up --build
   ```

3. **File upload errors:**
   - Ensure JSON file follows the expected format
   - Check file size (max 10MB)
   - Verify all required fields are present

## 📝 Development Notes

- The application uses TypeScript for type safety
- Tailwind CSS for responsive design
- Error boundaries for graceful error handling
- Docker volumes for development hot-reloading
- PostgreSQL with proper indexing for performance

## 🤝 Contributing

### Unified Repository Development
1. Fork the [Aerovania repository](https://github.com/codecraft26/Aerovania)
2. Create a feature branch from `main`
3. Make your changes to either frontend or backend
4. Test your changes locally using Docker or manual setup
5. Add tests if applicable
6. Submit a pull request

### Development Workflow
- **Backend changes:** Work in the `backend/` directory
- **Frontend changes:** Work in the `frontend/` directory
- **Full-stack features:** Coordinate changes across both directories
- **Database changes:** Update `backend/init.sql` and migration scripts

## 📄 License

This project is created for the Aerovania technical assessment.

## 🚀 Live Demo

**Production Application:** https://aeroniva-frontend.vercel.app/

**API Health Check:** https://backend.otito.in/api/health

---

**Demo Video:** [Link to be added]

For any questions or support, please contact the development team.
