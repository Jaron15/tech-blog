const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req,res) =>  {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exlude: ['password'] } 
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res) => {
    User.findOne({
        attributes: {exlude: ['password']},
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'body', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ],
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // expects {username: 'learnantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        req.session.save(() => {
            

            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req,res) => {
    console.log(req.body);
// expects {email: 'lernantino@gmail.com', password: 'password1234'}
User.findOne({
    where: {
        email: req.body.email
    }
}).then(dbUserData => {
    if (!dbUserData) {
        res.status(400).json({message: 'No user with that email address!'});
        return;
    }
    // res.json({ user: dbUserData });

    // verify user 
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
        res.status(400).json({message: 'Incorrect password!'});
        return; 
    }
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    req.session.save(() => {

        // declare session variables
        

        res.json({ user: dbUserData, message: 'You are now logged in!'});
    });
});
});

router.put('/:id', withAuth, (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use req.body instead
     User.update(req.body, {
         individualHooks: true,
         where: {
             id: req.params.id
         }
     })
     .then(dbUserData => {
         if (!dbUserData[0]) {
             res.status(404).json({message: 'No user found with this id'});
             return;
         }
         res.json(dbUserData);
     })
     .catch(err => {
         console.log(err);
         res.status(500).json(err);
     });
});

router.delete('/:id', withAuth, (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
})

module.exports = router;