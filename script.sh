# Test script for zkGraph

# Update `zkgraph.config.ts` with your own parameters first!
# Then run `sh test.sh`

npm run compile &&
npm run exec -- 5102656 &&
npm run prove -- --inputgen 5102656 a444f5e9000000000000000000000000000000000000000000000000000068656c6c6f20 &&
npm run prove -- --test 5102656 a444f5e9000000000000000000000000000000000000000000000000000068656c6c6f20