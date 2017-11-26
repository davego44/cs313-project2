const {Pool} = require('pg');

//const connectionString = "postgres://project2user:password@localhost:5432/postgres";

const pool = new Pool({
	connectionString : process.env.DATABASE_URL,
	ssl: true,
});

module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback);
	}
};