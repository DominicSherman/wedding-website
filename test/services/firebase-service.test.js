import firebase from 'firebase';
import Chance from 'chance';

import {getMedia, getRSVPData, initializeFirebase, insertRSVP} from '../../src/services/firebase-service';
import {config} from '../../src/config';
import {DEV, PROD} from '../../src/constants/constants';
import {getCurrentTime} from '../../src/services/service';

jest.mock('firebase');
jest.mock('../../src/constants/helper-functions');

const chance = new Chance();

describe('firebase-service', () => {
    let refSpy,
        expectedEnv;

    beforeEach(() => {
        expectedEnv = chance.pickone([DEV, PROD]);
        refSpy = jest.fn();
        firebase.database.mockReturnValue({
            ref: refSpy
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
    
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

    describe('insertRSVP', () => {
        let expectedName,
            expectedNumberInParty,
            expectedChild,
            expectedPayload,
            expectedDate,
            expectedTime,
            childSpy,
            setSpy;

        beforeEach(async () => {
            expectedName = chance.string();
            expectedNumberInParty = chance.natural();
            expectedTime = chance.string();
            expectedPayload = {
                name: expectedName,
                numberInParty: expectedNumberInParty,
                date: expectedTime
            };
            expectedDate = chance.string();
            expectedChild = `${expectedName.replace(/[^a-zA-Z0-9]/g, '')}-${expectedDate}`;

            Date.now = jest.fn().mockReturnValue(expectedDate);
            getCurrentTime.mockReturnValue(expectedTime);
            setSpy = jest.fn();
            childSpy = jest.fn().mockReturnValue({
                set: setSpy
            });
            refSpy.mockReturnValue({
                child: childSpy
            });

            await insertRSVP(expectedName, expectedNumberInParty, expectedEnv);
        });

        it('should insert the RSVP', async () => {
            expect(firebase.database).toHaveBeenCalledTimes(1);
            expect(refSpy).toHaveBeenCalledTimes(1);
            expect(refSpy).toHaveBeenCalledWith(`${expectedEnv}/rsvps`);
            expect(childSpy).toHaveBeenCalledTimes(1);
            expect(childSpy).toHaveBeenCalledWith(expectedChild);
            expect(setSpy).toHaveBeenCalledTimes(1);
            expect(setSpy).toHaveBeenCalledWith(expectedPayload);
        });
    });

    describe('getRSVPData', () => {
        it('should use firebase to get the RSVP data', () => {
            getRSVPData(expectedEnv);

            expect(firebase.database).toHaveBeenCalledTimes(1);
            expect(refSpy).toHaveBeenCalledTimes(1);
            expect(refSpy).toHaveBeenCalledWith(`${expectedEnv}/rsvps`);
        });
    });

    describe('getMedia', () => {
        it('should use firebase to get the media data', () => {
            getMedia(expectedEnv);

            expect(firebase.database).toHaveBeenCalledTimes(1);
            expect(refSpy).toHaveBeenCalledTimes(1);
            expect(refSpy).toHaveBeenCalledWith(`${expectedEnv}/media`);
        });
    });
});