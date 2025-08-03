/**
 * cart controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::cart.cart', ({ strapi }) => ({
  async create(ctx) {
    try {
      // Get request body data
      const { username, email, products, quantity } = ctx.request.body.data || {};
      
      // Validate required fields
      if (!email) {
        return ctx.badRequest('Email is required');
      }
      
      // Check if products is provided and is an array
      if (!products || !Array.isArray(products)) {
        return ctx.badRequest('Products must be provided as an array');
      }
      
      // Create the cart entry
      const response = await super.create(ctx);
      return response;
    } catch (error) {
      return ctx.badRequest(`Error creating cart: ${error.message}`);
    }
  }
}));
