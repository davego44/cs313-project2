const {Pool} = require('pg');

const connectionString = "postgres://project2user:password@localhost:5432/postgres";

const pool = new Pool({
	connectionString : connectionString,
});

module.exports = {
	query: (text, params, callback) => {
		console.log("about to query here");
		return pool.query(text, params, callback);
	}
};