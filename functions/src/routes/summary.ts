import * as express from 'express';
import * as admin from 'firebase-admin';

const router = express.Router();

/**
 * GET /summary/all
 * Get all summaries on system.
 */
router.get('/all', (req: express.Request, res: express.Response) => {
    const summaries: any[] = [];
    admin
        .firestore()
        .collection('summary')
        .get()
        .then(snapshot => {
            snapshot.forEach(summary => {
                summaries.push({ summaryID: summary.id, ...summary.data() })
            })
            return res.status(200).json(summaries)
        })
        .catch(e => {
            return res.status(500).json({ error: e })
        })
})

/**
 * GET /summary/uid/:uid
 * Returns all summaries made by a specific user.
 * @param {string} req.params.uid
 */
router.get('/uid/:uid', (req: express.Request, res: express.Response) => {
    const summaries: any[] = [];
    admin
        .firestore()
        .collection('summary')
        .where('uid', '==', req.params.uid)
        .get()
        .then(snapshot => {
            snapshot.forEach(summary => {
                summaries.push({ summaryID: summary.id, ...summary.data() })
            })
            return res.status(200).json(summaries)
        })
        .catch(e => {
            return res.status(500).json({ error: e })
        })
})

/**
 * GET /summary/book/:bookID
 * Returns all summaries made for a specific book.
 * @param {string} req.params.bookID
 */
router.get('/book/:bookID', (req: express.Request, res: express.Response) => {
    const summaries: any[] = [];
    admin
        .firestore()
        .collection('summary')
        .where('bookID', '==', req.params.bookID)
        .get()
        .then(snapshot => {
            snapshot.forEach(summary => {
                summaries.push({ summaryID: summary.id, ...summary.data() })
            })
            return res.status(200).json(summaries)
        })
        .catch(e => {
            return res.status(500).json({ error: e })
        })
})

/**
 * PUT /summary
 * Update a summary.
 * @param {string} req.body.summaryID
 * @param {string} req.body.content
 */
router.put('/', (req: express.Request, res: express.Response) => {
    admin
        .firestore()
        .collection('summary')
        .doc(req.body.summaryID)
        .update({
            content: req.body.content
        })
        .then(() => {
            return res.status(200).json({ message: `Successfully updated summary: ${req.body.summaryID}` })
        })
        .catch(e => {
            return res.status(500).json({ error: e })
        })
})

/**
 * DELETE /summary
 * Delete a summary.
 * @param {string} req.body.summaryID
 */
router.delete('/', (req: express.Request, res: express.Response) => {
    admin
        .firestore()
        .collection('summary')
        .doc(req.body.summaryID)
        .delete()
        .then(() => {
            return res.status(200).json({ message: `Successfully deleted summary: ${req.body.summaryID}` })
        })
        .catch(e => {
            return res.status(500).json({ error: e })
        })
})

/**
 * GET /summary/likes/:summaryID
 * Returns likes for a specific summary.
 * @param {string} req.params.summaryID
 */
router.get('/likes/:summaryID', (req: express.Request, res: express.Response) => {
    const likes: any[] = [];

    admin
        .firestore()
        .collection('summary')
        .doc(req.params.summaryID)
        .collection('like')
        .get()
        .then((snapShot) => {
            snapShot.forEach((doc) => {
                likes.push({ id: doc.id, ...doc.data() });
            });
            return res.status(200).json(likes);
        })
        .catch((e) => {
            return res.status(500).json({ error: e });
        });
});

/**
 * POST /summary/likes/
 * Adds a like to a summary.
 * @param {string} req.body.summaryID
 * @param {string} req.body.uid
 */
router.post('/likes', (req: express.Request, res: express.Response) => {
    admin
        .firestore()
        .collection('summary')
        .doc(req.body.summaryID)
        .collection('like')
        .doc(req.body.uid)
        .set({
            createdAt: admin.firestore.Timestamp.fromDate(new Date())
        })
        .then((doc) => {
            return res.status(200).json({
                message: `${req.body.uid} liked ${req.body.summaryID} successfully.`
            });
        })
        .catch((e) => {
            return res.status(500).json({ error: e });
        });
});

/**
 * DELETE /summary/likes/
 * Removes a like from a summary.
 * @param {string} req.body.summaryID
 * @param {string} req.body.uid
 */
router.delete('/likes', (req: express.Request, res: express.Response) => {
    admin
        .firestore()
        .collection('summary')
        .doc(req.body.summaryID)
        .collection('like')
        .doc(req.body.uid)
        .delete()
        .then(() => {
            return res.status(200).json({
                message: `Successfully deleted like from summary: ${req.body.summaryID}`
            });
        })
        .catch((e) => {
            return res.status(500).json({ error: e });
        });
});

module.exports = router;