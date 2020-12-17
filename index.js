const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const auth = require("./routes/api/users");
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(auth)

app.get('/', (req, res) => {
    res.send('nice job')
})


// app.listen(8080)