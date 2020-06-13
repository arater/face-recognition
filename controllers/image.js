const clarifai = require('clarifai')
require('dotenv').config()

// api usage with key
const app = new Clarifai.App({
    apiKey: process.env.API_KEY
   });

const handleApiCall = (req,res) => {
    app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req,res,db) => {
    const {id} = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => 
        {
            res.json(entries[0])
            console.log('entries', entries)
        })
    .catch(err => res.status(400).json('unable to find'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}