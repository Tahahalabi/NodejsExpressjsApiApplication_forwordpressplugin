const express = require("express");
const app = express();
const port = 3000 || process.env.port;
const http = require("http");
const bodyParser = require('body-parser');
const server = http.createServer(app);
const cors = require("cors");
const session = require('express-session')


app.use(bodyParser.json({limit: '50mb', extended: true}))

// Session
app.use(session({
    secret: 'taha',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 9000000000000
    }
}));

// Start Public Folders
app.use('/assets', express.static(__dirname + '/public'));

var corsOptions = {
  credentials: true
}
app.use(cors(corsOptions))

app.set('view engine', 'ejs');

app.use("/registration", require("./routes/registration/register"))

app.use('/checkmycredentials', require("./routes/checkmycredentials/checkmycredentials"))

app.use("/courses", require("./routes/courses/courses"));

server.listen(port);