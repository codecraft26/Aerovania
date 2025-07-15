#!/bin/bash

# Script to upload all sample reports to the backend
# Make sure the backend is running on port 8000

API_URL="http://localhost:8000/api/upload"
REPORTS_DIR="/Users/aman/Desktop/Aerovania"

echo "🚁 Starting bulk upload of drone violation reports..."
echo "Backend API: $API_URL"
echo ""

# Array of report files
reports=(
    "sample_report.json"
    "sample_test_report.json" 
    "sample_report_zone_b.json"
    "sample_report_zone_c.json"
    "sample_report_zone_a_day2.json"
    "sample_report_zone_d.json"
    "sample_report_zone_e.json"
)

uploaded=0
failed=0

for report in "${reports[@]}"; do
    report_path="$REPORTS_DIR/$report"
    
    if [ -f "$report_path" ]; then
        echo "📤 Uploading: $report"
        
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" \
            -X POST \
            -F "report=@$report_path" \
            "$API_URL")
        
        http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
        body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
        
        if [ "$http_code" -eq 200 ]; then
            echo "   ✅ Success: $body"
            ((uploaded++))
        else
            echo "   ❌ Failed (HTTP $http_code): $body"
            ((failed++))
        fi
        echo ""
    else
        echo "   ⚠️  File not found: $report_path"
        ((failed++))
        echo ""
    fi
done

echo "📊 Upload Summary:"
echo "   ✅ Successfully uploaded: $uploaded reports"
echo "   ❌ Failed uploads: $failed reports"
echo ""

if [ $uploaded -gt 0 ]; then
    echo "🎉 Reports uploaded successfully! You can now view them in the dashboard at:"
    echo "   Frontend: http://localhost:3000"
    echo "   API Health: http://localhost:8000/api/health"
else
    echo "⚠️  No reports were uploaded. Please check that the backend is running."
fi
