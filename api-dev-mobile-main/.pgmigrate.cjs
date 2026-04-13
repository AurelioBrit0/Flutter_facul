const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

module.exports = {
  "migrations-dir": "migrations",
  "migrations-table": "pgmigrations",
  verbose: true,
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: String(process.env.DB_PASSWORD ?? ""),
  database: process.env.DB_NAME || "api_camadas",
};
