import Chance from 'chance';
import {
    setMedia,
    setRSVPData,
    toggleAdminMenu,
    toggleEnv,
    togglePicturesVisible,
    toggleRSVPModal
} from '../src/actions';
import {action} from '../src/constants/action';
import {
    SET_ADMIN_MENU_VISIBLE,
    SET_ENV, SET_PICTURES,
    SET_PICTURES_VISIBLE,
    SET_RSVP_MODAL_VISIBLE,
    SET_RSVPS, SET_VIDEOS
} from '../src/constants/action-types';
import {getMedia, getRSVPData} from '../src/services/firebase-service';
import {DEV, PROD, reverseEnum} from '../src/constants/constants';

jest.mock('../src/services/firebase-service');

const chance = new Chance();

describe('actions', () => {
    let dispatchSpy,
        getStateStub,
        expectedState;

    beforeEach(() => {
        expectedState = {
            adminMenuVisible: chance.bool(),
            config: {
                env: chance.pickone([DEV, PROD])
            },
            rsvpModalVisible: chance.bool()
        };
        dispatchSpy = jest.fn();
        getStateStub = jest.fn(() => expectedState);
    });

    describe('toggleRSVPModal', () => {
        beforeEach(() => {
            toggleRSVPModal()(dispatchSpy, getStateStub);
        });

        it('should dispatch an action to toggle the RSVP modal', () => {
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                action(SET_RSVP_MODAL_VISIBLE, !expectedState.rsvpModalVisible)
            );
        });
    });

    describe('toggleAdminMenu', () => {
        beforeEach(() => {
            toggleAdminMenu()(dispatchSpy, getStateStub);
        });

        it('should dispatch an action to toggle the admin menu', () => {
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                action(SET_ADMIN_MENU_VISIBLE, !expectedState.adminMenuVisible)
            );
        });
    });

    describe('toggleEnv', () => {
        beforeEach(() => {
            toggleEnv()(dispatchSpy, getStateStub);
        });

        it('should dispatch an action to toggle the environment', () => {
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                action(SET_ENV, reverseEnum[expectedState.config.env])
            );
        });
    });

    describe('togglePicturesVisible', () => {
        beforeEach(() => {
            togglePicturesVisible()(dispatchSpy, getStateStub);
        });

        it('should dispatch an action to toggle the RSVP modal', () => {
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                action(SET_PICTURES_VISIBLE, !expectedState.config.picturesVisible)
            );
        });
    });

    describe('setRSVPData', () => {
        let onSpy,
            snapshot,
            expectedKeys,
            expectedData = [],
            expectedCount = 0,
            expectedDataObject;

        beforeEach(() => {
            onSpy = jest.fn();
            expectedKeys = chance.n(chance.string, chance.d6() + 1);
            expectedKeys.forEach(() => {
                expectedData = [...expectedData, {
                    date: chance.date(),
                    numberInParty: chance.natural({max: 100, min: 1}).toString()
                }];
            });
            expectedKeys.forEach((key, index) => {
                expectedDataObject = {
                    ...expectedDataObject,
                    [key]: expectedData[index]
                };
                expectedCount = expectedCount + Number(expectedData[index].numberInParty);
            });
            snapshot = {
                val: jest.fn(() => expectedDataObject)
            };

            getRSVPData.mockReturnValue({
                on: onSpy
            });
            setRSVPData()(dispatchSpy, getStateStub);
        });

        afterEach(() => {
            jest.resetAllMocks();
            expectedDataObject = {};
            expectedData = [];
            expectedCount = 0;
        });

        it('should get the RSVP data', () => {
            expect(getRSVPData).toHaveBeenCalledTimes(1);
            expect(getRSVPData).toHaveBeenCalledWith(expectedState.config.env);
        });

        it('should call on', () => {
            expect(onSpy).toHaveBeenCalledTimes(1);
            expect(onSpy).toHaveBeenCalledWith('value', expect.anything());
        });

        it('should dispatch the RSVPs when data is returned', () => {
            const snapshotCall = onSpy.mock.calls[0][1];

            snapshotCall(snapshot);
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                action(SET_RSVPS, {
                    data: expectedData.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1),
                    count: expectedCount
                })
            );
        });

        it('should dispatch the RSVPs when no data is returned', () => {
            snapshot = {
                val: jest.fn(() => null)
            };

            const snapshotCall = onSpy.mock.calls[0][1];

            snapshotCall(snapshot);
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                action(SET_RSVPS, {
                    data: [],
                    count: 0
                })
            );
        });
    });

    const createRandomMedia = () => ({
        url: chance.string(),
        width: chance.natural(),
        height: chance.natural(),
        isVideo: chance.bool()
    });

    const mapValue = (value) => ({
        src: value.url,
        width: value.width,
        height: value.height
    });

    describe('setMedia', () => {
        let onSpy,
            snapshot,
            sessionData = {},
            expectedSessionKeys,
            expectedPictures = [],
            expectedVideos = [],
            expectedMedia;

        beforeEach(() => {
            expectedSessionKeys = chance.n(chance.string, chance.d6() + 1);
            expectedSessionKeys.forEach((key) => {
                const innerKeys = chance.n(chance.string, chance.d6() + 1);
                sessionData = {};
                innerKeys.forEach((innerKey) => {
                    const value = createRandomMedia();

                    sessionData = {
                        ...sessionData,
                        [innerKey]: value
                    };

                    if (value.isVideo) {
                        expectedVideos = [...expectedVideos, mapValue(value)];
                    } else {
                        expectedPictures = [...expectedPictures, mapValue(value)];
                    }
                });
                expectedMedia = {
                    ...expectedMedia,
                    [key]: sessionData
                };
            });
            snapshot = {
                val: jest.fn(() => expectedMedia)
            };
            onSpy = jest.fn();
            getMedia.mockReturnValue({
                on: onSpy
            });
            setMedia()(dispatchSpy, getStateStub);
        });

        afterEach(() => {
            jest.resetAllMocks();
            sessionData = {};
            expectedMedia = {};
            expectedPictures = [];
            expectedVideos = [];
        });

        it('should call getMedia', () => {
            expect(getMedia).toHaveBeenCalledTimes(1);
            expect(getMedia).toHaveBeenCalledWith(expectedState.config.env);
        });

        it('should call on', () => {
            expect(onSpy).toHaveBeenCalledTimes(1);
            expect(onSpy).toHaveBeenCalledWith('value', expect.anything());
        });

        it('should set the pictures and videos if data is returned', () => {
            const snapshotCall = onSpy.mock.calls[0][1];

            snapshotCall(snapshot);
            expect(dispatchSpy).toHaveBeenCalledTimes(2);
            expect(dispatchSpy).toHaveBeenCalledWith(action(SET_PICTURES, expectedPictures));
            expect(dispatchSpy).toHaveBeenCalledWith(action(SET_VIDEOS, expectedVideos));
        });

        it('should set the pictures and videos to empty lists if media isnt returned', () => {
            const snapshotCall = onSpy.mock.calls[0][1];

            snapshot = {
                val: jest.fn(() => null)
            };
            snapshotCall(snapshot);
            expect(dispatchSpy).toHaveBeenCalledTimes(2);
            expect(dispatchSpy).toHaveBeenCalledWith(action(SET_PICTURES, []));
            expect(dispatchSpy).toHaveBeenCalledWith(action(SET_VIDEOS, []));
        });
    });
});