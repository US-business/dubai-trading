// server.js
const { createStrapi } = require('@strapi/strapi');
const app = createStrapi({ distDir: './dist' });

app.start();

module.exports = app; 