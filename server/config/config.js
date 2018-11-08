const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  const config = require('./config.json');
  const envConfig = config[env];

  Object.keys(envConfig).forEach((key) => process.env[key] = envConfig[key]);
}

/*
Example of config.json:
{
  "development": {
    "MONGODB_URI": "mongodb://localhost:27017/HackerNewsReader",
    "PORT": 3000
  }
}
*/