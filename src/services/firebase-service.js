import firebase from 'firebase/app';
import 'firebase/database';
import {config} from '../config';
import {getCurrentTime} from '../constants/helper-functions';

let isInitialized = false;
export const initializeFirebase = () => {
    if (!isInitialized) {
        firebase.initializeApp(config);
        isInitialized = true;
    }
};

export const insertRSVP = async (name, numberInParty, env) => {
    const payload = {
        name,
        numberInParty,
        date: getCurrentTime()
    };

    const child = `${name.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now()}`;

    await firebase.database().ref(`${env}/rsvps`).child(child).set(payload,
        (error) => {
            if (error) {
                console.log('ERROR', error);
            } else {
                console.log('Database insert complete');
            }
        });
};

export const getRSVPData = (env) => firebase.database().ref(`${env}/rsvps`);

export const getMedia = (env) => firebase.database().ref(`${env}/media`);