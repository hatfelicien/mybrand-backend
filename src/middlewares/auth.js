const jwt = require('jsonwebtoken');


 const verifyAuth = (req, res, next) =>{
    try {
        const { authorization } = req.headers;
        
        // check if authorization is there
        if (!authorization) {
            return res.status(401).json({
              status: "fail",
              message: "Missing authorisation token",
            });
          }

          const token = authorization.split(" ")[1];

          if (!token) {
            return res.status(401).json({
              status: "fail",
              message: "Token not found",
            });
          }

        //   veify token
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        
        next()

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
          });
    }
}

module.exports  = verifyAuth;