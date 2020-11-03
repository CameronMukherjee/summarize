import * as express from 'express';
// import * as admin from 'firebase-admin';

const router = express.Router();

router.get('/', (req, res) => {
    return res.json('live')
})

module.exports = router;