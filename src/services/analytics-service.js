import ReactGA from 'react-ga';
import {TRACKING_CODE} from '../config';

export const initializeAnalytics = () => ReactGA.initialize(TRACKING_CODE);

export const setPageViewed = (name) => ReactGA.pageview(`/${name}`);