'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Adding a health check endpoint for Render
    strapi.routes.push({
      method: 'GET',
      path: '/_health',
      handler: (ctx) => {
        ctx.send('OK');
      },
      config: {
        auth: false,
      }
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
}; 