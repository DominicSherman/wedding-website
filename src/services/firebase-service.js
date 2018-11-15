import firebase from 'firebase';
import {config} from '../config';
import {getCurrentTime} from '../constants/service';
import {eventId} from '../constants/constants';

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

    if (name !== '' && numberInParty !== '') {
        await firebase.database().ref(`${env}/rsvps/${eventId[env]}`).child(child).set(payload);
    }
};

export const getRSVPData = (env) => firebase.database().ref(`${env}/rsvps/${eventId[env]}`);

export const getMedia = (env) => firebase.database().ref(`${env}/media/${eventId[env]}`);