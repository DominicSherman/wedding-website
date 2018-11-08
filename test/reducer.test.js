import Chance from 'chance';
import reducer from '../src/reducer';
import {
    SET_ADMIN_MENU_VISIBLE,
    SET_ENV, SET_PICTURES,
    SET_PICTURES_VISIBLE,
    SET_RSVP_MODAL_VISIBLE, SET_RSVPS, SET_VIDEOS
} from '../src/constants/action-types';
import {PROD} from '../src/constants/constants';

const chance = new Chance();

describe('reducer', () => {
    const defaultState = {
        adminMenuVisible: false,
        config: {
            env: PROD,
            picturesVisible: false
        },
        rsvpModalVisible: false,
        RSVP: {
            data: [],
            count: 0
        },
        pictures: [],
        videos: []
    };

    let anyAction;

    beforeEach(() => {
        anyAction = chance.string();
    });

    it('should return state if an action fails to match', () => {
        const expectedState = chance.string();

        const actualState = reducer(expectedState, anyAction);

        expect(actualState).toBe(expectedState);
    });

    it('should return the default state if not called with state', () => {
        const actualState = reducer(undefined, anyAction);

        expect(actualState).toEqual(defaultState);
    });

    it('should set rsvpModalVisible when the action is SET_RSVP_MODAL_VISIBLE', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            rsvpModalVisible: chance.bool()
        };

        const expectedData = chance.bool();
        const action = {
            data: expectedData,
            type: SET_RSVP_MODAL_VISIBLE
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            rsvpModalVisible: expectedData
        });
    });

    it('should set adminMenuVisible when the action is SET_ADMIN_MENU_VISIBLE', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            adminMenuVisible: chance.bool()
        };

        const expectedData = chance.bool();
        const action = {
            data: expectedData,
            type: SET_ADMIN_MENU_VISIBLE
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            adminMenuVisible: expectedData
        });
    });

    it('should set env when the action is SET_ENV', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            config: {
                env: chance.bool()
            }
        };

        const expectedData = chance.bool();
        const action = {
            data: expectedData,
            type: SET_ENV
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            config: {
                env: expectedData
            }
        });
    });

    it('should set picturesVisible when the action is SET_PICTURES_VISIBLE', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            config: {
                picturesVisible: chance.bool()
            }
        };

        const expectedData = chance.bool();
        const action = {
            data: expectedData,
            type: SET_PICTURES_VISIBLE
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            config: {
                picturesVisible: expectedData
            }
        });
    });

    it('should set RSVP when the action is SET_RSVPS', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            RSVP: chance.bool()
        };

        const expectedData = chance.bool();
        const action = {
            data: expectedData,
            type: SET_RSVPS
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            RSVP: expectedData
        });
    });

    it('should set pictures when the action is SET_PICTURES', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            pictures: chance.bool()
        };

        const expectedData = chance.bool();
        const action = {
            data: expectedData,
            type: SET_PICTURES
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            pictures: expectedData
        });
    });

    it('should set videos when the action is SET_VIDEOS', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            videos: chance.bool()
        };

        const expectedData = chance.bool();
        const action = {
            data: expectedData,
            type: SET_VIDEOS
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            videos: expectedData
        });
    });
});