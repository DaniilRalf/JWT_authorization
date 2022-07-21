const {Role, User} = require('./models/Models')
const bcrypt = require('bcryptjs')

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
            res.status(400).json({message: e})
        }
    }

    async login(req, res){
        try {

        } catch (e) {
            console.log(e);
            res.static(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try {
            res.json('test login');
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController();