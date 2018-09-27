import {
    SET_ADMIN_MENU_VISIBLE,
    SET_ENV, SET_PICTURES,
    SET_RSVP_MODAL_VISIBLE, SET_RSVPS, SET_PICTURES_VISIBLE
} from './constants/action-types';

const defaultState = {
    adminMenuVisible: false,
    config: {
        env: 'dev',
        picturesVisible: false
    },
    rsvpModalVisible: false,
    RSVP: {
        data: [],
        count: 0
    },
    pictures: []
};

const setRSVPModalVisible = (state, rsvpModalVisible) => ({
    ...state,
    rsvpModalVisible
});

const setAdminMenuVisible = (state, adminMenuVisible) => ({
    ...state,
    adminMenuVisible
});

const setEnv = (state, env) => ({
    ...state,
    config: {
        ...state.config,
        env
    }
});

const setPicturesVisible = (state, picturesVisible) => ({
    ...state,
    config: {
        ...state.config,
        picturesVisible
    }
});

const setRSVPs = (state, RSVP) => ({
    ...state,
    RSVP
});

const setPictures = (state, pictures) => ({
    ...state,
    pictures
});

const reducerMap = {
    [SET_RSVP_MODAL_VISIBLE]: setRSVPModalVisible,
    [SET_ENV]: setEnv,
    [SET_ADMIN_MENU_VISIBLE]: setAdminMenuVisible,
    [SET_RSVPS]: setRSVPs,
    [SET_PICTURES]: setPictures,
    [SET_PICTURES_VISIBLE]: setPicturesVisible
};

export default (state = defaultState, {type, data}) => {
    if (reducerMap[type]) {
        return reducerMap[type](state, data);
    }

    return state;
};