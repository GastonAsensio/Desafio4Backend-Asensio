const { request, response } = require("express")

const validError = (req,res,next) => {
    if (!req.params.id || req.params.id <= 0) {  
        response.json({
            error: 'Bad Request, does not have id'
        }).status(400)
      }if (isNaN(req.params.id)) response.json({
        error: 'Bad Request, does not have id'})
       else {
      next();
    }
    }


module.exports = validError;
