const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');
//-------------------------------> END OF IMPORTS <-------------------------------

dotenv.config();
const PORT = process.env.APP_PORT || 3000;
const app = express();

// Streaming logs to file
const logStream = fs.createWriteStream(
    path.join(path.join(__dirname, 'logs'), 'requests.log'),
    { flags: 'a' }
);

connectDB();

app.use(
    morgan('dev', {
      stream: logStream,
    })
);

// Middleware
app.use(cors({
  origin: '*'
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static('public'));

// Routes
app.use('/', require('./routers/index'));

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {},
    });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server started listening on : ', server.address());
    process.env.APP_PORT = server.address().port.toString();
});