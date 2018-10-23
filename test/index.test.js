import Chance from 'chance';
import reactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import Main from '../src/Main';
import reducer from '../src/reducer';
import MainContainer from '../src/containers/MainContainer';

jest.mock('react-dom');
jest.mock('react-router-dom');
jest.mock('redux');
jest.mock('../src/reducer');

global.document = {};
global.window = {};

const chance = new Chance();

describe('index', () => {
    let expectedStore,
        expectedMiddleware,
        globalElement;

    const requireModule = () => require('../src/index');
    const getProvider = () => reactDOM.render.mock.calls[0][0];
    const getRouter = () => getProvider().props.children;
    const getMain = () => getRouter().props.children;

    beforeAll(() => {
        expectedStore = {};

        createStore.mockReturnValue(expectedStore);

        globalElement = chance.string();
        document.getElementById = jest.fn(() => globalElement);

        withRouter.mockReturnValue(Main);

        expectedMiddleware = chance.string();
        applyMiddleware.mockReturnValue(expectedMiddleware);
    });

    it('should call ReactDOM with Provider and html element', () => {
        requireModule();

        expect(reactDOM.render).toHaveBeenCalledTimes(1);

        expect(getProvider().type).toBe(Provider);

        const actualGlobalElement = reactDOM.render.mock.calls[0][1];

        expect(global.document.getElementById).toHaveBeenCalledTimes(1);
        expect(global.document.getElementById()).toBe(actualGlobalElement);
        expect(global.document.getElementById).toHaveBeenCalledWith('root');
    });

    it('should create the store', () => {
        expect(createStore).toHaveBeenCalledTimes(1);
        expect(createStore).toHaveBeenCalledWith(reducer, expectedMiddleware);
        expect(applyMiddleware).toHaveBeenCalledTimes(1);
        expect(applyMiddleware).toHaveBeenCalledWith(thunk);
    });

    it('should call withRouter', () => {
        expect(withRouter).toHaveBeenCalledTimes(1);
        expect(withRouter).toHaveBeenCalledWith(MainContainer);
    });

    it('should render Router', () => {
        expect(getRouter().type).toBe(Router);
    });

    it('should render Main', () => {
        expect(getMain().type).toBe(Main);
    });
});