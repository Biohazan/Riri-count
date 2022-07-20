const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// bcrypt.hash('Urbansteam1', 10).then(e => console.log(e))

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email})
        .then(user => {
            if (user === null){
                res.status(401).json({ message: 'Paire identifiant / mot de passe incorecte' })
            } else{
                bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid){
                        res.status(401).json({ message: 'Paire identifiant / mot de passe incorecte' })
                    } else {
                        res.status(200).json({
                            userId: user._id,
                            comptId: user.comptId,
                            token: jwt.sign(
                                { userId: user._id },
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h' }
                            )
                        })
                    }
                })
                .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
}