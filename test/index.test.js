import Chance from 'chance';
import reactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import * as redux from 'redux';

jest.mock('react-dom');
jest.mock('react-router-dom');
jest.mock('../src/Main', () => {
    const MockChance = require('chance');

    return new MockChance().string();
});
jest.mock('../src/other/registerServiceWorker');
jest.mock('../src/reducer');

const chance = new Chance();

describe('index', () => {
    let expectedProvider,
        expectedStore,
        globalElement;

    const requireModule = () => require('../src/index');
    const getProvider = () => reactDOM.render.mock.calls[0][0];
    const getRouter = () => getProvider().props.children;
    const getMain = () => getRouter().props.children;

    beforeEach(() => {
        requireModule();
        expectedProvider = chance.string();
        console.log('getProvider()', getProvider());
        // console.log('reactRedux', reactRedux);
        reactRedux.Provider.mockReturnValue(expectedProvider);
        expectedStore = {};

        redux.createStore.mockReturnValue(expectedStore);

        globalElement = chance.string();
        document.getElementById = jest.fn(() => globalElement);
    });

    it('should call ReactDOM with Provider and html element', () => {
        requireModule();

        expect(reactDOM.render).toHaveBeenCalledTimes(1);

        expect(getProvider().type()).toBe(expectedProvider);

        const actualGlobalElement = reactDOM.render.mock.calls[0][1];

        expect(global.document.querySelector).toHaveBeenCalledTimes(1);
        expect(global.document.querySelector()).toBe(actualGlobalElement);
        expect(global.document.querySelector).toHaveBeenCalledWith('root');
    });
});