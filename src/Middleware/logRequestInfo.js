const logRequestInfo = (req,res,next) => {
    console.log(`METODO: ${req} ${req.path}`)
next();
}

module.exports = logRequestInfo