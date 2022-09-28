const express = require('express');
const app = express();

const healthzRoutes = require('./api/routes/healthz');
app.use('/healthz',healthzRoutes);

module.exports = app;