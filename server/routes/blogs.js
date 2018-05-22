const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
let dbUser = null;


router.get('/', (req, res) => {
    Blog

        .find()
        .then(blog => {
            res.status(200).json(blog);

        });
});

router.get('/featured', (req, res) => {
    Blog
        .where("featured", true)
        .then(blog => {
            res.status(200).json(blog);
        }).catch(err => res.status(500).send());
});

//This will locate blogs that are under the featured parameter us using the /featured route and using where() that will have the featured value to search for enabling it as true so ones that are not featured will not be located.
router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blog => {
            if (blog) {
                return res.status(200).json(blog);
            }
            else { res.status(404).json(blog) }
        });

});

//above is locating with req.params.id then saying if (strict !) !user cannot be found return 404. If the user id can be found then return status 200.

router.post('/', (req,res) => {
    User
        .findById(req.body.authorId)
        .then(user => {
            dbUser = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);
            dbUser.save().then(() => res.status(201).json(blog));
        });
});

//This will post a new blog into the database by using a const to set the new input.

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id,req.body)
        .then(blog => {
            res.status(204).json(blog);
        });
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(blog => {
            res.status(200).send();
        })
        .catch(err => res.status(404).send(err.message));
});

module.exports = router;