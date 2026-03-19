const { Pool } = require("pg");

const isProduction = process.env.DATABASE_URL; // có URL = đang ở Render

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false } // Render
    : false, // Local
});

module.exports = pool;
