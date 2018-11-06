import Chance from 'chance';
import {initializeAnalytics, setPageViewed} from '../../src/services/analytics-service';
import {TRACKING_CODE} from '../../src/config';

jest.mock('react-ga');

const chance = new Chance();
describe('analytics-service', () => {
    let initialize,
        pageview;

    beforeEach(() => {
        initialize = require('react-ga').initialize;
        pageview = require('react-ga').pageview;
    });

    it('should initialize the analytics', () => {
        initializeAnalytics();

        expect(initialize).toHaveBeenCalledTimes(1);
        expect(initialize).toHaveBeenCalledWith(TRACKING_CODE);
    });

    it('should set the pageViewed', () => {
        const name = chance.string();

        setPageViewed(name);

        expect(pageview).toHaveBeenCalledTimes(1);
        expect(pageview).toHaveBeenCalledWith(`/${name}`);
    });
});