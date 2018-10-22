import firebase from 'firebase';
import Chance from 'chance';

import {getRSVPData, initializeFirebase} from '../../src/services/firebase-service';
import {config} from '../../src/config';
import {DEV, PROD} from '../../src/constants/constants';

jest.mock('firebase');

const chance = new Chance();

describe('firebase-service', () => {
    describe('initalizeFirebase', () => {
        it('should initialize firebase', () => {
            initializeFirebase();
            expect(firebase.initializeApp).toHaveBeenCalledTimes(1);
            expect(firebase.initializeApp).toHaveBeenCalledWith(config);
        });

        it('should not initialize firebase if it already has been', () => {
            initializeFirebase();

            jest.resetAllMocks();

            initializeFirebase();

            expect(firebase.initializeApp).not.toHaveBeenCalled();
        });
    });

    describe('getRSVPData', () => {
        let refSpy,
            expectedEnv;

        beforeEach(() => {
            expectedEnv = chance.pickone([DEV, PROD]);
            firebase.database.mockReturnValue({
                ref: refSpy
            });
        });

        it('should use firebase to get the RSVP data', () => {
            getRSVPData(expectedEnv);

            expect(firebase.database).toHaveBeenCalledTimes(1);
        });
    });
});