import {action} from './constants/action';
import {SET_RSVP_MODAL_VISIBLE} from './constants/action-types';

export const toggleRSVPModal = () => (dispatch, getState) => {
    const {rsvpModalVisible} = getState();

    dispatch(action(SET_RSVP_MODAL_VISIBLE, !rsvpModalVisible));
};