const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRET_KEY');
        const userId = decodedToken.userId;

        if (req.body.userId === userId) {
            next();
        }
    } catch(e) {
        console.log(e);
        res.status(400).json({message: 'Not authorization'})
    }
};
