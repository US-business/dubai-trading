# Deploying to Render

This guide outlines how to deploy your Strapi application to Render.

## Deployment Steps

1. **Create a Render account** at [render.com](https://render.com/) if you don't already have one.

2. **Connect your GitHub repository** to Render by signing in with GitHub.

3. **Deploy using the Blueprint**:
   - In the Render dashboard, click "New" and select "Blueprint"
   - Select your repository 
   - Render will automatically detect the `render.yaml` file and configure the resources
   - Click "Apply" to start the deployment process

4. **Environment Variables**:
   The following environment variables will be automatically configured:
   - `NODE_VERSION`: 18.18.0
   - `NODE_ENV`: production
   - `DATABASE_URL`: From the connected PostgreSQL database
   - `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`: Automatically generated
   - `RENDER_EXTERNAL_URL`: Automatically set based on your service URL

   You'll need to manually add these Cloudinary variables in the Render dashboard:
   - `CLOUDINARY_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_KEY`: Your Cloudinary API key
   - `CLOUDINARY_SECRET`: Your Cloudinary API secret

5. **First-Time Access**:
   - Once deployed, you'll need to create an admin user
   - Visit `https://your-app-name.onrender.com/admin` to set up your admin account

6. **Connecting to Your Frontend**:
   - Create an API token in Strapi (Settings > API Tokens)
   - Use the Render URL and API token in your frontend application

## Troubleshooting

- **Database Connection Issues**: Check that your DATABASE_URL is properly set
- **Cloudinary Issues**: Verify your Cloudinary credentials are correctly set in the environment variables
- **Build Failures**: Check the build logs in the Render dashboard for specific errors

## Additional Resources

- [Render Documentation for Strapi](https://render.com/docs/deploy-strapi)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment) 