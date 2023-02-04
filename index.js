const dotenv = require('dotenv')
dotenv.config('.env')
const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const auth = require("./routes/api/users");
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(auth)
console.log(":::::::::::::::: PROCESS", process.env)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }