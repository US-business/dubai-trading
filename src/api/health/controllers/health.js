'use strict';

/**
 * A simple health check controller
 */

module.exports = {
  check: async (ctx) => {
    ctx.body = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    };
  },
}; 