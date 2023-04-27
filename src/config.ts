/**
 * Config File
 * Add all configs here
 */

import dotenv from 'dotenv';
dotenv.config()

export class Config {

  // Environment
  NODE_ENV = process.env.NODE_ENV || "development"
  LOCAL_DEVELOPMENT = process.env.LOCAL_DEVELOPMENT == 'true' ? true : false

  // App
  HOST = process.env.HOST || this.NODE_ENV == 'development' ? 'localhost' : '0.0.0.0'
  PORT = parseInt(process.env.PORT || '8000')

  // PostgreSQL
  POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
  POSTGRES_USER = process.env.POSTGRES_USER || "postgres";
  POSTGRES_PASS = process.env.POSTGRES_PASS || "postgres";
  POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || "5432");
  POSTGRES_DB = process.env.POSTGRES_DB || "mining";  
  POSTGRES_CONN_STRING = `postgres://${this.POSTGRES_USER}:${this.POSTGRES_PASS}@${this.POSTGRES_HOST}:${this.POSTGRES_PORT}/${this.POSTGRES_DB}`


  constructor() {
    // constructor code goes here
  }
}

const config = new Config()
export default config;