import {isMobile, isIOS, isAndroid} from 'react-device-detect';
import {androidAppLink, iosAppLink} from '../constants/constants';

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