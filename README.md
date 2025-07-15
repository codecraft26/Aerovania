# AI Analytics Dashboard - Drone Safety Monitoring

A full-stack web application that simulates an AI-powered drone analytics dashboard for monitoring safety violations. This platform ingests daily AI reports in JSON format, stores and visualizes data, plots geotagged violations on a map, and displays KPIs and analytics.

## 🚀 Features

### 1. Upload Interface
- Upload .json AI reports with validation
- Real-time file processing and storage
- Support for multiple violation types
- Error handling with detailed feedback

### 2. Dashboard View
**KPI Cards:**
- Total violations count
- Violations by type distribution
- Active drone monitoring
- Location coverage metrics

**Charts:**
- Pie chart showing violation type distribution
- Bar chart displaying violations by drone
- Time series showing violations over time
- Interactive tooltips and legends

### 3. Map View
- Interactive map with violation markers
- Color-coded markers by violation type
- Popup information showing violation details
- Static boundary polygon overlay
- Marker clustering for better performance
- Evidence image preview in popups

### 4. Table View
- Sortable columns for all violation data
- Real-time search functionality
- CSV export capability
- Pagination for large datasets
- Responsive design for mobile devices

### 5. Advanced Filtering
- Filter by Drone ID
- Filter by Date range
- Filter by Violation Type
- Clear individual or all filters
- Active filter indicators

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **Charts** | Recharts |
| **Maps** | Leaflet.js with OpenStreetMap tiles |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
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

1. **Clone the repository:**
   ```bash
   # Backend repository
   git clone https://github.com/codecraft26/Aerovania.git
   cd Aerovania
   
   # Frontend repository (separate)
   git clone https://github.com/codecraft26/aeroniva-frontend.git
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
- **Backend Repository:** [Aerovania](https://github.com/codecraft26/Aerovania) (Current repository)
- **Frontend Repository:** [aeroniva-frontend](https://github.com/codecraft26/aeroniva-frontend)

### Deployment Infrastructure
- **Platform:** Frontend on Vercel, Backend on Digital Ocean Droplets
- **Frontend:** Next.js application deployed on Vercel
- **Backend:** Node.js/Express API server with HTTPS configuration on Digital Ocean
- **Database:** PostgreSQL database hosted on Digital Ocean
- **SSL:** HTTPS enabled for secure connections on both platforms

### Manual Setup (Development)

1. **Database Setup:**
   ```bash
   # Start PostgreSQL using Docker
   docker run --name postgres-db -e POSTGRES_DB=drone_analytics -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   # Navigate to frontend repository
   cd aeroniva-frontend
   npm install
   npm run dev
   ```

## 📁 Project Structure

### Backend Repository (Current)
```
Aerovania/
├── docker-compose.yml          # Docker orchestration
├── sample_report.json          # Sample data for testing
├── README.md                   # Project documentation
├── backend/
│   ├── Dockerfile             # Backend container config
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Express server
│   └── init.sql               # Database initialization
└── frontend/                  # Local frontend (for docker-compose)
    ├── dockerfile             # Frontend container config
    └── package.json           # Frontend dependencies
```

### Frontend Repository (Separate)
```
aeroniva-frontend/
├── package.json               # Frontend dependencies
├── next.config.ts             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
├── src/
│   ├── app/
│   │   ├── layout.tsx         # App layout
│   │   └── page.tsx           # Main dashboard page
│   ├── components/
│   │   ├── Dashboard.tsx      # Dashboard with KPIs and charts
│   │   ├── FilterPanel.tsx    # Filtering component
│   │   ├── Map.tsx            # Leaflet map component
│   │   ├── MapView.tsx        # Map view wrapper
│   │   ├── TableView.tsx      # Data table component
│   │   └── UploadForm.tsx     # File upload component
│   └── utils/
│       ├── api.ts             # API utility functions
│       └── types.ts           # TypeScript type definitions
└── public/                    # Static assets
```

## 🔧 API Endpoints

### Upload
- `POST /api/upload` - Upload JSON report file

### Data Retrieval
- `GET /api/violations` - Get violations with optional filters
- `GET /api/kpis` - Get KPI statistics
- `GET /api/filters` - Get available filter options
- `GET /api/health` - Health check endpoint

### Query Parameters
- `drone_id` - Filter by drone ID
- `date` - Filter by date (YYYY-MM-DD)
- `type` - Filter by violation type
- `limit` - Limit number of results

### Example API Usage

```bash
# Upload a report (Local development)
curl -X POST -F "report=@sample_report.json" http://localhost:8000/api/upload

# Upload a report (Production)
curl -X POST -F "report=@sample_report.json" https://backend.otito.in/api/upload

# Get violations for a specific drone (Local)
curl "http://localhost:8000/api/violations?drone_id=DRONE_ZONE_1"

# Get violations for a specific drone (Production)
curl "https://backend.otito.in/api/violations?drone_id=DRONE_ZONE_1"

# Get KPIs for a specific date (Production)
curl "https://backend.otito.in/api/kpis?date=2025-07-10"
```

## 📊 Sample Data Format

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
DATABASE_URL=postgresql://postgres:password@localhost:5432/drone_analytics
CORS_ORIGINS=http://localhost:3000
PORT=8000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_BASE=http://localhost:8000/api
```

### Production Environment

**Backend (.env.production):**
```env
DATABASE_URL=postgresql://username:password@database-host:5432/drone_analytics
CORS_ORIGINS=https://aeroniva-frontend.vercel.app
PORT=8000
SSL_ENABLED=true
```

**Frontend (.env.production):**
```env
NEXT_PUBLIC_API_BASE=https://backend.otito.in/api
```

## 🧪 Testing the Application

### Local Testing
1. **Start the application** using `docker-compose up --build`
2. **Navigate to** http://localhost:3000
3. **Upload the sample file** using the provided `sample_report.json`
4. **Explore the dashboard** to see KPIs and charts
5. **View the map** to see violation locations
6. **Use the table view** to search and filter data

### Production Testing
1. **Visit the live application** at https://aeroniva-frontend.vercel.app/
2. **Upload sample data** using any of the provided sample JSON files
3. **Test all features** including dashboard, map view, and table view
4. **Verify API endpoints** using https://backend.otito.in/api/health

## 🎯 Bonus Features Implemented

- ✅ **Live refresh** for new uploads with automatic data reload
- ✅ **Advanced search** with real-time filtering across all fields
- ✅ **Export functionality** with CSV download
- ✅ **Responsive design** optimized for all device sizes
- ✅ **Interactive maps** with custom markers and popups
- ✅ **Real-time validation** for uploaded JSON files
- ✅ **Production deployment** on Digital Ocean with HTTPS
- ✅ **Custom domain** configuration for secure access
- ✅ **Cloud database** hosting for reliable data storage

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

### Backend Repository
1. Fork the [Aerovania repository](https://github.com/codecraft26/Aerovania)
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Frontend Repository
1. Fork the [aeroniva-frontend repository](https://github.com/codecraft26/aeroniva-frontend)
2. Create a feature branch
3. Make your changes
4. Test your changes locally
5. Submit a pull request

## 📄 License

This project is created for the Aerovania technical assessment.

## 🚀 Live Demo

**Production Application:** https://aeroniva-frontend.vercel.app/

**API Health Check:** https://backend.otito.in/api/health

---

**Demo Video:** [Link to be added]

For any questions or support, please contact the development team.
