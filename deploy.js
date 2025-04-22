// deploy.js
// This file helps with Vercel deployment by performing necessary setup
const fs = require('fs');
const path = require('path');

// Ensure proper environment variables are available for Vercel deployment
console.log('Starting deployment setup for Vercel...');

// Create .env file for Vercel if it doesn't exist
if (!fs.existsSync('.env')) {
  console.log('Creating .env file for Vercel deployment...');
  const envTemplate = `
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
DATABASE_CLIENT=postgres

# Make sure to set these in Vercel environment variables
# DATABASE_HOST=
# DATABASE_PORT=
# DATABASE_NAME=
# DATABASE_USERNAME=
# DATABASE_PASSWORD=
# DATABASE_SSL=true
# APP_KEYS=
# API_TOKEN_SALT=
# ADMIN_JWT_SECRET=
# JWT_SECRET=
# TRANSFER_TOKEN_SALT=

# Cloudinary
# CLOUDINARY_NAME=
# CLOUDINARY_KEY=
# CLOUDINARY_SECRET=
`;
  
  fs.writeFileSync('.env', envTemplate);
  console.log('.env file created successfully');
}

// Make sure the tmp directory exists
const tmpDir = path.join(__dirname, '.tmp');
if (!fs.existsSync(tmpDir)) {
  console.log('Creating .tmp directory...');
  fs.mkdirSync(tmpDir, { recursive: true });
  console.log('.tmp directory created');
}

console.log('Deployment setup complete!'); 