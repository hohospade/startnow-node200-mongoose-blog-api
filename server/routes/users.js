const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User

        .find()
        .then(user => {
            res.status(200).json(user);

        });
});
// the above will find anything as there is no specific search parameter.

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            if (!user) res.status(404).send();
            res.status(200).json(user);
        }).catch(err => res.status(404))
});
//above is locating with req.params.id then saying if (strict !) !user cannot be found return 404. If the user id can be found then return status 200.

router.post('/', (req, res) => {
    const user = new User(req.body)
    user
        .save()
        .then(user => {
            res.status(201).json(user);
        });
});
//The above is using the const as a fixed item to put a post into the body area of the users.

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id)
        .then(user => {
            if (!user) res.status(404).send();
            res.status(204).json(user);
        }).catch(err => res.status(500).send());
});
//This is locating a specific ID to then update one of the values listed inside. By putting the ! before user I am making this a strict rule that if it does not locate the exact one to return an error incase something is mistyped. If it is correct them it will return the 204 status and send the 500 once the update has taken place.


router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) res.status(404).send();
            res.status(200).json(user);
        }).catch(err => res.status(500).send());
});
// For delete I have the same thing where it has a strict rule and if it does not find it then a 404 error is returned. If it is correct then it will locate the user by ID and delete it from the system.

module.exports = router;