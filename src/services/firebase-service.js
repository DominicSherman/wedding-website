import firebase from 'firebase';
import {config} from '../config';
import {eventId} from '../constants/constants';
import moment from 'moment';

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
        date: moment().toISOString()
    };

    const child = `${name.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now()}`;

    if (name !== '' && numberInParty !== '') {
        await firebase.database().ref(`${env}/rsvps/${eventId[env]}`).child(child).set(payload);
    }
};

export const getRSVPData = (env) => firebase.database().ref(`${env}/rsvps/${eventId[env]}`);

export const getMedia = (env) => firebase.database().ref(`${env}/media/${eventId[env]}`);