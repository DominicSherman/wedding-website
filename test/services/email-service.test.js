import Chance from 'chance';

import {ENDPOINT, sendEmail} from '../../src/services/email-service';
import {DEV, PROD} from '../../src/constants/constants';

const chance = new Chance();

describe('email-service', () => {
    describe('sendEmail', () => {
        let expectedName,
            expectedNumberInParty,
            expectedCount;
        
        beforeEach(() => {
            global.fetch = jest.fn();

            expectedName = chance.string();
            expectedNumberInParty = chance.natural();
            expectedCount = chance.natural();
        });

        it('should call fetch in dev', () => {
            sendEmail(expectedName, expectedNumberInParty, expectedCount, DEV);

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(`${ENDPOINT}?to=dominic.sherman98@gmail.com&subject=${expectedName} has RSVP'd!&text=Number in party: ${expectedNumberInParty} \t Total count: ${Number(expectedNumberInParty) + Number(expectedCount)}`);
        });

        it('should call fetch in prod', () => {
            sendEmail(expectedName, expectedNumberInParty, expectedCount, PROD);

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(`${ENDPOINT}?to=dominic.sherman98@gmail.com, mary.edson03@gmail.com, jmjedson@gmail.com&subject=${expectedName} has RSVP'd!&text=Number in party: ${expectedNumberInParty} \t Total count: ${Number(expectedNumberInParty) + Number(expectedCount)}`);
        });
    });
});