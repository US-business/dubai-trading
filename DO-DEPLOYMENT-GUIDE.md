# Deploying Strapi to Digital Ocean App Platform

This guide will help you deploy your Strapi application to Digital Ocean App Platform, which is better suited for Strapi's needs than Vercel. We'll then connect it to your Next.js frontend that's deployed on Vercel.

## Why Digital Ocean App Platform for Strapi?

Strapi is a Node.js server application that needs to run continuously. Vercel's serverless architecture isn't ideal for this type of application. Digital Ocean App Platform provides a more suitable environment for Strapi with:

- Persistent filesystem (for media uploads)
- Managed PostgreSQL database support
- Better support for long-running server applications
- Zero downtime deploys

## Step 1: Create a Digital Ocean Account

If you don't already have a Digital Ocean account, create one at [digitalocean.com](https://www.digitalocean.com/).

## Step 2: Configure your Strapi Application

Make sure your Strapi application is properly configured for production. You should have:

1. A PostgreSQL database configuration
2. Cloudinary for file uploads (recommended) or configure to use local uploads

### Database Configuration

Create or update your `config/env/production/database.js` file:

```js
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
  },
});
```

### Server Configuration

Create or update your `config/env/production/server.js` file:

```js
module.exports = ({ env }) => ({
  proxy: true,
  url: env('APP_URL'),
  app: {
    keys: env.array('APP_KEYS')
  },
});
```

### Media Upload Configuration

#### For Cloudinary (Recommended)

Install the Cloudinary provider:

```bash
npm install @strapi/provider-upload-cloudinary
```

Create or update your `config/plugins.js` file:

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

## Step 3: Push Your Code to GitHub

Make sure your Strapi application code is pushed to a GitHub repository.

## Step 4: Create a Digital Ocean App

1. Login to your Digital Ocean account
2. Click "Create" and select "Apps"
3. Select GitHub and connect your repository
4. Choose the branch to deploy from
5. Configure your resources:
   - Select "Web Service" as the type
   - Select the appropriate plan (Standard should be sufficient)
   - Click "Next"

## Step 5: Configure Database

1. Click "Add Resource"
2. Select "Database"
3. Choose "PostgreSQL"
4. Select a plan that matches your needs (typically the smallest plan is sufficient for starting)
5. Name your database (e.g., "strapi-db")
6. Click "Create and Attach"

## Step 6: Configure Environment Variables

Add the following environment variables:

```
NODE_ENV=production
APP_URL=${APP_URL}
DATABASE_HOST=${strapi-db.HOSTNAME}
DATABASE_PORT=${strapi-db.PORT}
DATABASE_NAME=${strapi-db.DATABASE}
DATABASE_USERNAME=${strapi-db.USERNAME}
DATABASE_PASSWORD=${strapi-db.PASSWORD}
DATABASE_SSL=true
APP_KEYS=[your-app-keys]
API_TOKEN_SALT=[your-api-token-salt]
ADMIN_JWT_SECRET=[your-admin-jwt-secret]
JWT_SECRET=[your-jwt-secret]
CLOUDINARY_NAME=[your-cloudinary-name]
CLOUDINARY_KEY=[your-cloudinary-key]
CLOUDINARY_SECRET=[your-cloudinary-secret]
```

Replace the bracketed values with your actual secrets. You can generate random strings for the secrets using services like [randomkeygen.com](https://randomkeygen.com/).

## Step 7: Deploy Your Application

Click "Create Resources" to deploy your application.

## Step 8: Create API Tokens for Your Frontend

Once your Strapi application is deployed:

1. Access your Strapi admin panel at `https://your-app-url.ondigitalocean.app/admin`
2. Go to Settings > API Tokens
3. Create a new API token with appropriate permissions
4. Copy this token for use in your Next.js frontend

## Step 9: Connect Your Next.js Frontend (on Vercel)

1. Update your Next.js application to use the new Strapi API endpoint
2. Add the following environment variables to your Vercel project:
   ```
   STRAPI_URL=https://your-app-url.ondigitalocean.app
   STRAPI_API_TOKEN=your-api-token
   ```

3. Deploy your Next.js application to Vercel

## Step 10: Test the Connection

1. Make sure your Next.js frontend can connect to the Strapi backend
2. Test fetching data and media from Strapi

## Troubleshooting

- **Database Connection Issues**: Make sure your database environment variables are correctly set
- **Media Upload Issues**: Check your Cloudinary configuration
- **CORS Errors**: Configure CORS in your Strapi application to allow requests from your Vercel frontend

## Additional Resources

- [Digital Ocean App Platform Documentation](https://docs.digitalocean.com/products/app-platform/)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Connecting Strapi to Next.js](https://strapi.io/blog/build-a-blog-with-next-js-strapi-and-typescript) 