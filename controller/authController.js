const {Role, User} = require('../models/Models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, 'SECRET_KEY', {expiresIn: "24h"})
}


class AuthController{

    async registration(req, res){
        try {
            const {username, password} = req.body;
            const condidate = await User.findOne({where: {username: username}});
            if (condidate){
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'});
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({where: {value: 'USER'}});
            const user = await User.create({username, password: hashPassword, roleId: [userRole.id]})
            res.json(user);

        } catch (e) {
            console.log(e);
            res.status(400).json(e.message)
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body;
            const condidate = await User.findOne({where: {username: username}});      
            if (!condidate){
                return res.status(400).json({message: 'Пользователь с таким именем не существует'});
            }
            const validPassword = bcrypt.compareSync(password, condidate.password);
            if (!validPassword){
                return res.status(400).json({message: 'Введен не верный пароль'});
            }

            const token = generateAccessToken(condidate.id, condidate.role);

            let dataLogin = {
                id: condidate.id,
                username: condidate.username,
                roleId: condidate.roleId,
                token: token
            }

            res.json(dataLogin);

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try {
            res.status(200).json('Login is successful');
        } catch (e) {
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new AuthController();
