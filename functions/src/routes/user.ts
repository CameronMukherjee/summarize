/**
 * @module user
 * Users Microservice
 * ./routes/user.ts
 * Includes all REST operations for user management.
 * @author Cameron Mukherjee
 */

import * as express from 'express';
import * as admin from 'firebase-admin';

const router = express.Router();

/**
 * GET /user/all
 * Returns all users
 */
router.get('/all', (req: express.Request, res: express.Response) => {
    admin
        .auth()
        .listUsers()
        .then(users => {
            return res.status(200).json(users)
        })
        .catch(e => {
            return res.status(500).json({ error: e })
        })
})

/**
 * GET /user/:uid
 * Returns users deatils via uid
 * @param {string} req.params.uid
 */
router.get('/:uid', (req: express.Request, res: express.Response) => {
    admin
        .auth()
        .getUser(req.params.uid)
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(e => {
            return res.status(500).json({ error: e })
        })
})

/**
 * PUT /user
 * Updates a user
 * @param {string} req.body.uid
 * @param {string} req.body.email
 * @param {string} req.body.displayName
 * @param {string} req.body.photoURL
 */
router.post('/', (req: express.Request, res: express.Response) => {
    admin
    .auth()
    .updateUser(req.body.uid, {
        email: req.body.email,
        displayName: req.body.displayName,
        photoURL: req.body.photoURL
    })
    .then(() => {
        return res.status(200).json({message: `Successfully updated user: ${req.body.uid}`})
    })
    .catch(e => {
        return res.status(500).json({ error: e })
    })
})

/**
 * DELETE /user
 * Deletes a user
 * @param {string} req.body.uid
 */
router.delete('/', (req: express.Request, res: express.Response) => {
    admin
        .auth()
        .deleteUser(req.body.uid)
        .then(() => {
            return res.status(200).json({message: `Successfully deleted user: ${req.body.uid}`});
        })
        .catch((e) => {
            return res.status(500).json({ error: e });
        });
});

module.exports = router;