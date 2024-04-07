const { constants } = require("../constants");

//Middleware to handle errors
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ 
                title: "Validation", 
                message: err.message, 
            });
            break;
        case constants.NOT_FOUND:
            res.json({ 
                title: "Not Found", 
                message: err.message, 
            });
        case constants.UNAUTHORIZED:
            res.json({ 
                title: "Unauthorized", 
                message: err.message, 
            });

        case constants.FORBIDDEN:
            res.json({ 
                title: "Forbidden", 
                message: err.message, 
            });

        case constants.SERVER_ERROR:
            res.json({ 
                title: "SERVER Error", 
                message: err.message, 
            });
            
        default:
            console.log("ALL GOOD");
            break;
    }
     
}

module.exports = errorHandler;