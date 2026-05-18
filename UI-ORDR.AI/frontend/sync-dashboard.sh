#!/bin/bash

# ============================================================
# Dashboard Sync & Setup Script
# Synchronizes raw-stitch-export/main-dashboard with react-main-dashboard
# ============================================================

echo "🚀 Starting Dashboard Sync..."
echo ""

# Define paths
FRONTEND_PATH="/Users/sasank.kotra/UI-ORDR.AI/UI-ORDR.AI/UI-ORDR.AI/frontend"
RAW_STITCH_PATH="$FRONTEND_PATH/raw-stitch-export/main-dashboard"
REACT_PATH="$FRONTEND_PATH/react-main-dashboard"
EXPORTS_PATH="$REACT_PATH/public/exports"

# Step 1: Verify directories exist
echo "📁 Step 1: Verifying directories..."
if [ -d "$RAW_STITCH_PATH" ] && [ -d "$REACT_PATH" ]; then
    echo "✅ Both directories found"
else
    echo "❌ Error: Directories not found"
    exit 1
fi

# Step 2: Copy unified HTML to React project
echo ""
echo "📋 Step 2: Copying unified HTML..."
cp "$RAW_STITCH_PATH/index.html" "$REACT_PATH/index.unified.html"
echo "✅ Copied: index.html → index.unified.html"

# Step 3: Create exports directory
echo ""
echo "📁 Step 3: Creating exports directory..."
mkdir -p "$EXPORTS_PATH"
echo "✅ Created: $EXPORTS_PATH"

# Step 4: Copy all RawStitch export folders
echo ""
echo "📦 Step 4: Copying RawStitch export directories..."
for dir in "$RAW_STITCH_PATH"/*; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        # Convert to kebab-case
        targetname=$(echo "$dirname" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
        cp -r "$dir" "$EXPORTS_PATH/$targetname"
        echo "✅ Copied: $dirname → exports/$targetname"
    fi
done

# Step 5: Display file counts
echo ""
echo "📊 Step 5: Verification Report"
echo "---"
echo "Raw Stitch HTML files: $(find "$RAW_STITCH_PATH" -name "*.html" | wc -l)"
echo "React HTML files: $(find "$REACT_PATH" -name "*.html" | wc -l)"
echo "React JSX files: $(find "$REACT_PATH" -name "*.jsx" | wc -l)"
echo "Copied exports: $(find "$EXPORTS_PATH" -type d | wc -l)"

# Step 6: Git status
echo ""
echo "🔄 Step 6: Git Status"
cd "$FRONTEND_PATH"/.. || exit
git status --short

echo ""
echo "✅ Sync Complete!"
echo ""
echo "📌 Next Steps:"
echo "1. Review changes: git status"
echo "2. Commit changes: git add . && git commit -m 'sync: Consolidate main-dashboard and react-main-dashboard'"
echo "3. Push changes: git push origin main"
echo ""
echo "🌐 To run:"
echo "   - Static HTML:  open $RAW_STITCH_PATH/index.html"
echo "   - React app:    cd $REACT_PATH && npm install && npm run dev"
