const pool = require("./db");

(async () => {
  try {
    // Check what tables exist
    const tables = await pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("📋 Tables in database:", tables.rows);

    // Check if posts table exists and has data
    try {
      const postsCount = await pool.query("SELECT COUNT(*) FROM posts");
      console.log("📊 Posts table rows:", postsCount.rows[0].count);
    } catch (e) {
      console.log("❌ Posts table does not exist");
    }

    // Check if topics table exists and has data
    try {
      const topicsCount = await pool.query("SELECT COUNT(*) FROM topics");
      console.log("📊 Topics table rows:", topicsCount.rows[0].count);
    } catch (e) {
      console.log("❌ Topics table does not exist");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();
