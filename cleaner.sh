# Find all node_modules directories and remove them
find . -type d -name "node_modules" -exec rm -rf {} \;