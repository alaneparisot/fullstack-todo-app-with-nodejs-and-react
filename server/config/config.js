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
    "JWT_SECRET_OR_PRIVATE_KEY": "my-key",
    "JWT_TOKEN_EXPIRATION_DELAY": "1h",
    "MONGODB_URI": "mongodb://<dbuser>:<dbpassword>@<dbhost>:<dbport>/<dbname>",
    "PORT": 5000,
    "SALT_ROUNDS": 10
  }
}
*/