var jwt = require('jsonwebtoken');

const auth = async (req, res, next)=> {
    await jwt.verify(req.headers.authorization, 'dataa', next)
    
}
module.exports = auth;                               