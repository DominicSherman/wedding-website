import firebase from 'firebase/app';
import 'firebase/database';
import {config, ENV} from '../config';
import {getCurrentTime} from '../constants/helper-functions';

export const initializeFirebase = () => firebase.initializeApp(config);

export const insertRSVP = async (name, numberInParty) => {
    const payload = {
        name,
        numberInParty,
        date: getCurrentTime()
    };

    const child = `${name.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now()}`;

    await firebase.database().ref(`${ENV}/rsvps`).child(child).set(payload,
        (error) => {
            if (error) {
                console.log('ERROR', error);
            } else {
                console.log('Database insert complete');
            }
        });
};

export const getRSVPData = () => firebase.database().ref(`${ENV}/rsvps`);