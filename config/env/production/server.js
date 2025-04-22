module.exports = ({ env }) => ({
  url: env('VERCEL_URL') ? `https://${env('VERCEL_URL')}` : 'http://localhost:1337',
  app: {
    keys: env.array('APP_KEYS')
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
}); 