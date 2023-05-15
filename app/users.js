const express = require('express');
const router = express.Router();
const user = require('./models/user'); // get our mongoose model
const bcrypt = require('bcrypt');



router.get('/me', async (req, res) => {
    if (!req.loggedUser) {
        return;
    }

    let utente = await user.findOne({ email: req.loggedUser.email });

    res.status(200).json({
        self: '/api/v1/users/' + utente.id,
        email: utente.email
    });
});

router.get('', async (req, res) => {
    let users;

    if (req.query.email) {
        // https://mongoosejs.com/docs/api.html#model_Model.find
        users = await user.find({ email: req.query.email }).exec();
    }
    else
        users = await user.find().exec();

    users = users.map((entry) => {
        return {
            self: '/api/v1/users/' + entry.id,
            email: entry.email
        }
    });

    res.status(200).json(users);
});

router.post('', async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            console.error(err);
            return;
        }
        let utente = new user({
            nome: req.body.nome,
            cognome: req.body.cognome,
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        if (!utente.email || typeof utente.email != 'string' || !checkIfEmailInString(utente.email)) {
            res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
            return;
        }

        res.json({
            success: true,
            message: 'Welcome',
            email: user.email,
            id: utente._id,
            self: "api/v1/" + utente._id
        });
        utente = await utente.save();
        let userId = utente.id;
        res.location("/api/v1/users/" + userId).status(201).send();
    });
});

router.get('/:id', async (req, res) => {
    let utente = await user.findById(req.params.id);
    res.status(200).json({
        email: utente.email,
        self: '/api/v1/users/' + utente.id,
        title: utente.title
    });
});


function checkIfEmailInString(text) {
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(text);
}



module.exports = router;
