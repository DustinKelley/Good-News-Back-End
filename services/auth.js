const jwt = require('jsonwebtoken');
const { User } = require('../models');


const secretKey = 'iamthesecretkey';

/* JWT Token creation */
module.exports = {
    createJWT: (user) => {
        const token = jwt.sign({
            user_name: user.user_name, 
            id: user.id
        },
        secretKey,
        {
        expiresIn: '48h'
        });

        return token;
    },
    verifyUser: (token) => {
        try {
            const decodedPayload = jwt.verify(token, secretKey)
            return User.findByPk(decodedPayload.id)
        } catch(err){
            return null;
        };
    }
};

