# Deploying Strapi to Render

This guide will help you deploy your Strapi application to Render, which is better suited for Strapi's needs than Vercel. We'll then connect it to your Next.js frontend deployed on Vercel.

## Why Render for Strapi?

Strapi is a Node.js server application that needs to run continuously. Vercel's serverless architecture isn't ideal for this type of application. Render provides a more suitable environment for Strapi with:

- Persistent disk storage for uploads
- Managed PostgreSQL database support
- Better support for long-running server applications
- Free SSL certificates

## Step 1: Create a Render Account

Sign up for a Render account at [render.com](https://render.com/) if you don't already have one.

## Step 2: Configure your Strapi Application

Let's modify your Strapi application to prepare it for deployment on Render.

### Create Production Configuration

1. Create a `config/env/production` directory in your Strapi project if it doesn't exist.

2. Create `database.js` in this directory:

```js
const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
  },
});
```

3. Create `server.js` in the same directory:

```js
module.exports = ({ env }) => ({
  proxy: true,
  url: env('RENDER_EXTERNAL_URL'),
  app: {
    keys: env.array('APP_KEYS')
  },
});
```

### Install Dependencies

Add the required dependencies:

```bash
npm install pg pg-connection-string
```

### Optionally Configure Cloudinary (Recommended for Production)

For media uploads in production, it's recommended to use Cloudinary:

1. Install the Cloudinary provider:

```bash
npm install @strapi/provider-upload-cloudinary
```

2. Create or update `config/plugins.js`:

```js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
```

### Create render.yaml for Infrastructure as Code

Create a `render.yaml` file in the root of your project:

```yaml
services:
  - type: web
    name: strapi
    env: node
    plan: starter
    buildCommand: npm install && npm run build
    startCommand: npm start
    healthCheckPath: /_health
    envVars:
      - key: NODE_VERSION
        value: 18.18.0
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: strapi-postgres
          property: connectionString
      - key: APP_KEYS
        generateValue: true
      - key: API_TOKEN_SALT
        generateValue: true
      - key: ADMIN_JWT_SECRET
        generateValue: true
      - key: JWT_SECRET
        generateValue: true
      - key: CLOUDINARY_NAME
        sync: false
      - key: CLOUDINARY_KEY
        sync: false
      - key: CLOUDINARY_SECRET
        sync: false

databases:
  - name: strapi-postgres
    plan: starter
```

If you plan to use local file uploads instead of Cloudinary, add a disk to your configuration:

```yaml
services:
  - type: web
    name: strapi
    env: node
    plan: starter
    buildCommand: npm install && npm run build
    startCommand: npm start
    healthCheckPath: /_health
    disk:
      name: uploads
      mountPath: /opt/render/project/src/public/uploads
      sizeGB: 1
    envVars:
      # Rest of environment variables...
```

## Step 3: Push Your Code to GitHub

Commit your changes and push them to your GitHub repository:

```bash
git add .
git commit -m "Configure Strapi for Render deployment"
git push
```

## Step 4: Deploy to Render

1. Log in to your Render dashboard
2. Click "New" and select "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file and configure the resources
5. Click "Apply" to start the deployment process

If you're not using a `render.yaml` file, you can manually:

1. Click "New" and select "Web Service"
2. Connect your GitHub repository
3. Configure the build and start commands
4. Add environment variables
5. Create a PostgreSQL database and link it

## Step 5: Create API Tokens for Your Frontend

Once your Strapi application is deployed:

1. Access your Strapi admin panel at `https://your-app-name.onrender.com/admin`
2. Go to Settings > API Tokens
3. Create a new API token with appropriate permissions
4. Copy this token for use in your Next.js frontend

## Step 6: Connect Your Next.js Frontend (on Vercel)

1. Update your Next.js application to use the new Strapi API endpoint
2. Add the following environment variables to your Vercel project:

```
STRAPI_URL=https://your-app-name.onrender.com
STRAPI_API_TOKEN=your-api-token
```

3. Deploy your Next.js application to Vercel

## Step 7: Test the Connection

1. Make sure your Next.js frontend can connect to the Strapi backend
2. Test fetching data and media from Strapi

## Troubleshooting

- **Database Connection Issues**: Verify that your database connection URL is properly set up
- **CORS Errors**: Configure CORS in Strapi to allow requests from your Vercel frontend domain
- **Upload Issues**: Check your Cloudinary configuration or disk storage settings
- **Memory Issues**: If you encounter memory issues during build, you may need to use a larger instance type

## Additional Resources

- [Render Documentation for Strapi](https://render.com/docs/deploy-strapi)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Connecting Strapi to Next.js](https://strapi.io/blog/build-a-blog-with-next-js-strapi-and-typescript) 