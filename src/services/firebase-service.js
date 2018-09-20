import firebase from 'firebase/app';
import 'firebase/database';
import {config, ENV} from '../config';

export const initializeFirebase = () => firebase.initializeApp(config);

export const insertRSVP = async (name, numberInParty) => {
    const payload = {
        name,
        numberInParty
    };

    const child = name.replace(/[^a-zA-Z0-9]/g, '');

    await firebase.database().ref(ENV).child(child).set(payload,
        (error) => {
            if (error) {
                console.log('ERROR', error);
            } else {
                console.log('Database insert complete');
            }
        });
};