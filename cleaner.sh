# Find all node_modules directories and remove them
find . -type d -name "node_modules" -exec rm -rf {} \;

# Find all pnpm-lock.yaml files and remove them
find . -type f -name "pnpm-lock.yaml" -exec rm -rf {} \;