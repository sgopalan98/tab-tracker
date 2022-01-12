const {User} = require('../models')

module.exports = {
    async register(req, res) {
        try{
            const user = await User.create(req.body)
            res.send(user.TOJSON)
        }
        catch(err){
            res.status(400).send({
                error: 'This email is already is use'
            })
        }
    }
}