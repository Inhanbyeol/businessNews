require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dateStrings: 'date',
  multipleStatements: true,
});

module.exports = {
  dbSQL: async (sql) => {
    const connection = await db.getConnection(async (conn) => conn);

    try {
      await connection.beginTransaction();
      const [rows] = await connection.query(sql);
      await connection.commit();

      return rows;
    } catch (err) {
      await connection.rollback();
      connection.release();
      return err;
    } finally {
      connection.release();
    }
  },
};
