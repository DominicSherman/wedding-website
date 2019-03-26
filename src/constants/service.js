import {isMobile, isIOS, isAndroid} from 'react-device-detect';
import {androidAppLink, iosAppLink} from './constants';

export const getCurrentTime = () => {
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();

    return `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()} ${today.getHours()}:${minutes}:${seconds}`;
};

export const openAppLink = () => {
    if (!isMobile) {
        window.open(iosAppLink, '_blank');
    } else {
        if (isIOS) {
            window.open(iosAppLink, '_blank');
        } else if (isAndroid) {
            window.open(androidAppLink, '_blank');
        }
    }
};

const oneDay = 24 * 60 * 60 * 1000;
const weddingDay = new Date("2019-05-28T00:00:00-07:00").getTime();

export const calculateDaysLeft = () => {
    const now = Date.now();

    return Math.ceil((weddingDay - now) / (oneDay));
};

export const getIsMobile = () => isMobile;