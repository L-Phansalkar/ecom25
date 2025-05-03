const Sequelize = import('sequelize')
const pkg = import('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

let config

// Use the full database URI for production (e.g., Heroku or RDS)
const productionDbUrl = 'postgres://ueoael8e5t54f6:p17af9bdfe1675f36a4e3b798b1d102c6ae634353bea93e9a555c163367f4119b@cbec45869p4jbu.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d1gvdriukqfbi0'

const dbUrl = process.env.DATABASE_URL || productionDbUrl || `postgresql://localhost:5432/${databaseName}`

if (dbUrl.includes('amazonaws.com')) {
  config = {
    logging: false,
    ssl: true,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        import: true,
        rejectUnauthorized: false
      }
    }
  }
} else {
  config = {
    logging: false
  }
}

const db = new Sequelize(dbUrl, config)

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}