const {Song} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const songs = await Song.findAll({
        limit: 10
      })
      return res.send(songs)
    } catch (err) {
      return res.status(500).send({
        error: 'an error has occured trying to fetch the songs'
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findById(req.params.songId)
      return res.send(song)
    } catch (err) {
      return res.status(500).send({
        error: 'an error has occured trying to show the songs'
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      return res.send(song)
    } catch (err) {
      return res.status(500).send({
        error: 'an error has occured trying to create the song'
      })
    }
  },
  async put (req, res) {
    try {
      const song = await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      return res.send(req.body)
    } catch (err) {
      return res.status(500).send({
        error: 'an error has occured trying to update the song'
      })
    }
  }
} 