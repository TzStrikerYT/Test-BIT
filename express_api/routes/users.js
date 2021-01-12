const express = require('express');
const router = express.Router();
const UserService = require('../services/users');

const userService = new UserService()

// /api/users

router.get('/', async (req, res) => {
    const { fName, sName } = req.query;
    await userService.getUsers({ fName, sName })
        .then(data => {
            res.status(200).json({
                data: data,
                message: `There are all users by name:${fName}, ${sName}`
            });
        })
        .catch(err => {
            res.status(500).json({
                data: err,
                message: `Something went wrong searching the users by Name`
            })
        });
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    await userService.getUsersById( { userId } )
        .then(data => {
            if (data) {
                res.status(200).json({
                    data: data,
                    message: `This is the user that make match with ${userId} id`
                });
            } else {
                res.status(200).json({
                    data: data,
                    message: `The action has been enacted but the response does not include an entity`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                data: err,
                message: `Something went wrong searching the users by tags`
            })
        })
});

// router.get('/login', async (req, res) => {
//     const { userEmail, userPwd } = req.body;
//     await userService.getUsersByCredentials( { userEmail } )
//         .then(data => {
//                 res.status(200).json({
//                     data: data,
//                     message: `This is the user data`
//                 });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 data: err,
//                 message: `Something went wrong searching the users by tags`
//             })
//         })
// });

router.post('/', async (req, res) => {
    const user = req.body;
    await userService.registerUser( { user } )
        .then(data => {
            res.status(201).json({
                message: `The new user was created successfully`
            })})
        .catch(error => {
            res.status(500).json({
                data: error,
                message: `Something went wrong creating the new user`
            })})
});

router.put('/:userId', async (req, res) => {
    const {userId} = req.params;
    const user = req.body;
    await userService.updateUser({userId, user})
        .then(data => {
            if (data) {
                res.status(200).json({
                    data: data,
                    message: `The user was updated correctly`
                });
            } else {
                res.status(204).json({
                    data: data,
                    message: `the action has been enacted but the response does not include an entity`
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                data: error,
                message: `Something went wrong updating the user`
            })
        })
});

router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    await userService.deleteUser( { userId } )
        .then(data => {
            res.status(200).json({
                data: data,
                message: `The user was deleted successfully`
            });
        })
        .catch(error => {
            res.status(500).json({
                data: error,
                message: `Something went wrong deleting the user`
            });
        })
});

module.exports = router;