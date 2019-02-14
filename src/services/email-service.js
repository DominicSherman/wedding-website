import rp from 'request-promise';
import {PROD} from '../constants/constants';

const ENDPOINT = 'https://us-central1-sherman-email-sender.cloudfunctions.net/sendEmail/';

export const sendEmail = (name, numberInParty, count, env) => {
    let to = 'dominic.sherman98@gmail.com';

    if (env === PROD) {
        to = `${to}, mary.edson03@gmail.com, jmjedson@gmail.com`;
    }

    rp({
        json: true,
        qs: {
            to,
            subject: `${name} has RSVP'd!`,
            text: `Number in party: ${numberInParty} \t Total count: ${Number(numberInParty) + Number(count)}`
        },
        uri: ENDPOINT
    });
};