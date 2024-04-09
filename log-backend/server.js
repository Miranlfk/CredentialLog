const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const corsOptions = require('./config/corsOptions');
const dotenv = require('dotenv').config();
const cors = require('cors');

connectDB();
const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.json());
app.use("/api/logs", require("./routes/logsRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/file", require("./routes/fileRoute"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});