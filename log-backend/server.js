const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const validateToken = require('./middleware/tokenHandler');
const connectDB = require('./config/dbConnection');
const corsOptions = require('./config/corsOptions');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');

//Connect to the Database
connectDB();

const app = express();

const port = process.env.PORT || 8080;

// app.use(credentials)
//Cross Origin Resource Sharing
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

//middleware for cookies
app.use(cookieParser());

//middleware for parsing json
app.use(express.json());

//Routing
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/file", require("./routes/fileRoute"));
// app.use("/api/refresh", require("./routes/refresh"));
app.use("/api/logs", require("./routes/logsRoute"));

//Custom Error Handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});