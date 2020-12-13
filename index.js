const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const auth = require("./authorization_code/app");

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/', (req, res) => {
    res.send('nice job')
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(5000)