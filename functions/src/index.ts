/**
 * Summarize API via Firebase Functions
 * ./index.ts
 * Includes all middlware and routing
 * @author Cameron Mukherjee (S5111158)
 */

import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Creates each route as its own microservice.
 */
const summaryMS = express();
const userMS = express();

/**
 * Routing for modularisation and maintainability of code.
 */
summaryMS.use('/', require('./routes/summary'));
userMS.use('/', require('./routes/user'))

/**
 * Converting route to microservice.
 */
const summary = functions.https.onRequest(summaryMS);
const user = functions.https.onRequest(userMS);

/**
 * Deploying exports to firebase functions.
 */
module.exports = {
    summary,
    user
}