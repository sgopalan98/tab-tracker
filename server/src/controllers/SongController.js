const {Song} = require('../models')

module.exports = {
    async post(req, res) {
        try{
            const song = await Song.create(req.body)
            return res.send(song.toJSON())
        }
        catch(err){
            console.log(err)
            return res.status(400).send({
                error: 'Unable to create songs'
            })
        }
    },
    async index(req, res){
        try{
            const songs = await Song.findAll({
                limit: 10
            })
            return res.send(songs)
        }
        catch(err){
            return res.status(500).send({
                error: 'Unable to list songs'
            })
        }
    }
}