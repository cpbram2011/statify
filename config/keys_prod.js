const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    client_id: process.env.CLIENT_ID,
    secretOrKey: process.env.SECRET_OR_KEY
  }