import {action} from './constants/action';
import {
    SET_ADMIN_MENU_VISIBLE,
    SET_ENV,
    SET_PICTURES, SET_PICTURES_VISIBLE,
    SET_RSVP_MODAL_VISIBLE,
    SET_RSVPS, SET_VIDEOS
} from './constants/action-types';
import {reverseEnum} from './constants/constants';
import {getMedia, getRSVPData} from './services/firebase-service';

export const toggleRSVPModal = () => (dispatch, getState) => {
    const {rsvpModalVisible} = getState();

    dispatch(action(SET_RSVP_MODAL_VISIBLE, !rsvpModalVisible));
};

export const toggleAdminMenu = () => (dispatch, getState) => {
    const {adminMenuVisible} = getState();

    dispatch(action(SET_ADMIN_MENU_VISIBLE, !adminMenuVisible));
};

export const toggleEnv = () => (dispatch, getState) => {
    const {config: {env}} = getState();

    dispatch(action(SET_ENV, reverseEnum[env]));
};

export const togglePicturesVisible = () => (dispatch, getState) => {
    const {config: {picturesVisible}} = getState();

    dispatch(action(SET_PICTURES_VISIBLE, !picturesVisible));
};

export const setRSVPData = () => (dispatch, getState) => {
    const {config: {env}} = getState();

    getRSVPData(env).on('value', (snapshot) => {
        const dataObject = snapshot.val();

        if (dataObject) {
            const data = Object.keys(dataObject).map((key) => dataObject[key]);
            const count = data.reduce((accum, item) => accum + Number(item.numberInParty), 0);
            data.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);

            dispatch(action(SET_RSVPS, {
                data,
                count
            }))
        } else {
            dispatch(action(SET_RSVPS, {
                data: [],
                count: 0
            }))
        }
    });
};

export const setMedia = () => (dispatch, getState) => {
    const {config: {env}} = getState();
    let all = [],
        photos = [],
        videos = [];

    getMedia(env).on('value', (snapshot) => {
        const media = snapshot.val();

        if (media) {
            const sets = Object.keys(media).map((key) => {
                const sessionImages = media[key];
                return Object.keys(sessionImages).map((key) => sessionImages[key]);
            });
            sets.forEach((set) => set.forEach((item) => all = [...all, item]));

            all.forEach(({url, width, height, isVideo}) => {
                if (isVideo) {
                    videos = [
                        ...videos,
                        {
                            src: url,
                            width,
                            height
                        }
                    ];
                } else {
                    photos = [
                        ...photos,
                        {
                            src: url,
                            width,
                            height
                        }
                    ]
                }
            });

            dispatch(action(SET_PICTURES, photos));
            dispatch(action(SET_VIDEOS, videos));
        } else {
            dispatch(action(SET_PICTURES, []));
            dispatch(action(SET_VIDEOS, []));
        }
    });
};