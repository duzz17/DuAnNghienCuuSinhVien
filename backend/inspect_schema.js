const pool = require('./db');

(async () => {
  try {
    const res1 = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
    console.log('TABLES', res1.rows.map(r => r.table_name));

    const res2 = await pool.query("SELECT conname, pg_get_constraintdef(c.oid) AS def FROM pg_constraint c JOIN pg_class t ON c.conrelid = t.oid WHERE t.relname='comments' AND c.contype='f'");
    console.log('CONSTRAINTS', res2.rows);

    const res3 = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='comments'");
    console.log('COLUMNS', res3.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
})();
