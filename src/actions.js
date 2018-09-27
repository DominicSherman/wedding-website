import {action} from './constants/action';
import {SET_ADMIN_MENU_VISIBLE, SET_ENV, SET_RSVP_MODAL_VISIBLE, SET_RSVPS} from './constants/action-types';
import {reverseEnum} from './constants/constants';
import {getRSVPData} from './services/firebase-service';

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

export const setRSVPData = () => (dispatch, getState) => {
    const {config: {env}} = getState();
    const dataRef = getRSVPData(env);

    dataRef.on('value', (snapshot) => {
        const dataObject = snapshot.val();

        if (dataObject) {
            const data = Object.keys(dataObject).map((key) => dataObject[key]);
            const count = data.reduce((accum, item) => accum + Number(item.numberInParty), 0);
            data.sort((a, b) => a.date < b.date ? 1 : -1);

            dispatch(action(SET_RSVPS, {
                data,
                count
            }))
        }
    });
};