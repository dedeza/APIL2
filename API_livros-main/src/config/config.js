module.exports = {
    development: {
      username: process.env.DB_DEVELOPMENT_USERNAME,
      password: process.env.DB_DEVELOPMENT_PASSWORD,
      database: process.env.DB_DEVELOPMENT_DATABASE,
      dialect: 'sqlite',
      storage: "./src/database/db.development.sqlite",
      define: {
        timestamps: true,
        underscored: true
      }
    },
    test: {
      username: process.env.DB_DEVELOPMENT_USERNAME,
      password: process.env.DB_DEVELOPMENT_PASSWORD,
      database: process.env.DB_DEVELOPMENT_DATABASE,
      dialect: 'sqlite',
      storage: "./src/database/db.development.sqlite",
      define: {
        timestamps: true,
        underscored: true
      }
    },
    production: {
      username: process.env.DB_DEVELOPMENT_USERNAME,
      password: process.env.DB_DEVELOPMENT_PASSWORD,
      database: process.env.DB_DEVELOPMENT_DATABASE,
      dialect: 'sqlite',
      storage: "./src/database/db.development.sqlite",
      define: {
        timestamps: true,
        underscored: true
      }
    }
  };