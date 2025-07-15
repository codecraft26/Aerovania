#!/bin/bash

# Aerovania Sample Reports Upload Script with Authentication
# This script uploads all sample JSON files to the API

# Configuration
BACKEND_URL=${BACKEND_URL:-"http://localhost:8000"}
API_BASE="$BACKEND_URL/api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to register a test user
register_test_user() {
    print_status "Registering test user..."
    
    REGISTER_RESPONSE=$(curl -s -X POST "$API_BASE/auth/register" \
        -H "Content-Type: application/json" \
        -d '{
            "username": "testuser",
            "email": "test@aerovania.com",
            "password": "TestPassword123!",
            "role": "user"
        }')
    
    if echo "$REGISTER_RESPONSE" | grep -q "accessToken"; then
        print_success "Test user registered successfully"
        echo "$REGISTER_RESPONSE" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4
    else
        print_warning "User might already exist, trying to login..."
        return 1
    fi
}

# Function to login and get JWT token
login_user() {
    print_status "Logging in test user..."
    
    LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE/auth/login" \
        -H "Content-Type: application/json" \
        -d '{
            "email": "test@aerovania.com",
            "password": "TestPassword123!"
        }')
    
    if echo "$LOGIN_RESPONSE" | grep -q "accessToken"; then
        print_success "Login successful"
        echo "$LOGIN_RESPONSE" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4
    else
        print_error "Login failed: $LOGIN_RESPONSE"
        return 1
    fi
}

# Function to get authentication token
get_auth_token() {
    # Try to register first, if that fails, try to login
    TOKEN=$(register_test_user)
    if [ $? -ne 0 ] || [ -z "$TOKEN" ]; then
        TOKEN=$(login_user)
        if [ $? -ne 0 ] || [ -z "$TOKEN" ]; then
            print_error "Failed to obtain authentication token"
            exit 1
        fi
    fi
    echo "$TOKEN"
}

# Function to upload a single file
upload_file() {
    local file=$1
    local token=$2
    
    if [ ! -f "$file" ]; then
        print_error "File not found: $file"
        return 1
    fi
    
    print_status "Uploading $file..."
    
    RESPONSE=$(curl -s -X POST "$API_BASE/reports/upload" \
        -H "Authorization: Bearer $token" \
        -F "report=@$file")
    
    if echo "$RESPONSE" | grep -q "success\|uploaded\|processed"; then
        print_success "Successfully uploaded $file"
        return 0
    else
        print_error "Failed to upload $file: $RESPONSE"
        return 1
    fi
}

# Function to check API health
check_api_health() {
    print_status "Checking API health..."
    
    HEALTH_RESPONSE=$(curl -s "$API_BASE/health")
    
    if echo "$HEALTH_RESPONSE" | grep -q "OK"; then
        print_success "API is healthy"
        return 0
    else
        print_error "API health check failed: $HEALTH_RESPONSE"
        return 1
    fi
}

# Main script
main() {
    echo "======================================"
    echo "  Aerovania Sample Reports Upload"
    echo "======================================"
    echo ""
    
    print_status "Using API: $API_BASE"
    echo ""
    
    # Check API health first
    if ! check_api_health; then
        print_error "API is not available. Please ensure the backend is running."
        exit 1
    fi
    
    # Get authentication token
    print_status "Setting up authentication..."
    TOKEN=$(get_auth_token)
    
    if [ -z "$TOKEN" ]; then
        print_error "Failed to obtain authentication token"
        exit 1
    fi
    
    print_success "Authentication token obtained"
    echo ""
    
    # List of sample files to upload
    FILES=(
        "sample_report.json"
        "sample_20_records.json"
        "sample_report_zone_a_day2.json"
        "sample_report_zone_b.json"
        "sample_report_zone_c.json"
        "sample_report_zone_d.json"
        "sample_report_zone_e.json"
        "sample_test_report.json"
        "test_upload.json"
    )
    
    # Upload each file
    TOTAL_FILES=${#FILES[@]}
    UPLOADED_COUNT=0
    FAILED_COUNT=0
    
    for file in "${FILES[@]}"; do
        if upload_file "$file" "$TOKEN"; then
            ((UPLOADED_COUNT++))
        else
            ((FAILED_COUNT++))
        fi
        echo ""
    done
    
    # Summary
    echo "======================================"
    echo "           Upload Summary"
    echo "======================================"
    echo "Total files attempted: $TOTAL_FILES"
    echo "Successfully uploaded: $UPLOADED_COUNT"
    echo "Failed uploads: $FAILED_COUNT"
    echo ""
    
    if [ $FAILED_COUNT -eq 0 ]; then
        print_success "All files uploaded successfully!"
    else
        print_warning "Some files failed to upload. Check the error messages above."
    fi
    
    print_status "You can now access the dashboard to view the uploaded data."
    echo "Dashboard URL: ${BACKEND_URL/8000/3000}"
}

# Check if curl is available
if ! command -v curl &> /dev/null; then
    print_error "curl is required but not installed. Please install curl and try again."
    exit 1
fi

# Run the main function
main "$@"
