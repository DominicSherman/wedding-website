import {
    SET_RSVP_MODAL_VISIBLE
} from './constants/action-types';

const defaultState = {
    rsvpModalVisible: false
};

const setRSVPModalVisible = (state, rsvpModalVisible) => ({
    ...state,
    rsvpModalVisible
});

const reducerMap = {
    [SET_RSVP_MODAL_VISIBLE]: setRSVPModalVisible
};

export default (state = defaultState, {type, data}) => {
    if (reducerMap[type]) {
        return reducerMap[type](state, data);
    }

    return state;
};