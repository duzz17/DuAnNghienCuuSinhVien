// const { Pool } = require("pg");

// const isProduction = process.env.DATABASE_URL; // có URL = đang ở Render

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: isProduction
//     ? { rejectUnauthorized: false } // Render
//     : false, // Local
// });

// module.exports = pool;
////=====
// const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.DATABASE_URL
//     ? { rejectUnauthorized: false } // chạy trên Render
//     : false, // chạy local
// });

// module.exports = pool;
const { Pool } = require("pg");

const isRender = process.env.DATABASE_URL;

const pool = new Pool(
  isRender
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        user: "postgres",
        host: "localhost",
        database: "research_platform",
        password: "123456",
        port: 5432,
      },
);

module.exports = pool;
