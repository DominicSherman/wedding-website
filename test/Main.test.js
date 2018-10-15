import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import LoadingScreen from 'react-loading-screen';

import {Main} from '../src/Main';
import NavBar from '../src/components/NavBar';
import Routing from '../src/Routing';
import Footer from '../src/components/Footer';
import ModalContainer from '../src/modals/ModalContainer';
import {initializeFirebase} from '../src/services/firebase-service';

jest.mock('../src/services/firebase-service');

const chance = new Chance();

describe('Main', () => {
    let expectedProps,
        expectedScrollY,
        expectedClientHeight,

        renderedInstance,
        renderedComponent,

        renderedWrapperDiv,

        renderedDiv,
        renderedNavBar,
        renderedRouting,
        renderedFooter,
        renderedModalContainer,

        renderedHeaderImage;

    const cacheChildren = () => {
        renderedWrapperDiv = renderedComponent.props.children;

        [
            renderedDiv,
            renderedNavBar,
            renderedRouting,
            renderedFooter,
            renderedModalContainer
        ] = renderedWrapperDiv.props.children;

        renderedHeaderImage = renderedDiv.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Main {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedInstance = shallowRenderer.getMountedInstance();

        cacheChildren();
    };

    beforeEach(() => {
        expectedScrollY = chance.natural();
        expectedClientHeight = expectedScrollY + 1;

        global.window = {
            addEventListener: jest.fn(),
            scrollY: expectedScrollY
        };

        global.document = {
            getElementById: jest.fn({
                clientHeight: expectedClientHeight
            })
        };

        expectedProps = {
            actions: {
                toggleAdminMenu: jest.fn(),
                setRSVPData: jest.fn(),
                setMedia: jest.fn()
            }
        };

        renderComponent();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('componentWillMount', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            renderedInstance.componentWillMount();
        });

        it('should call initializeFirebase', () => {
            expect(initializeFirebase).toHaveBeenCalledTimes(1);
        });
    });

    describe('componentDidMount', () => {
        beforeEach(() => {
            renderedInstance.componentDidMount();
        });

        it('should call getElementById', () => {
            expect(document.getElementById).toHaveBeenCalledTimes(1);
            expect(document.getElementById).toHaveBeenCalledWith('headerImageWrapper');
        });

        it('should add an event listener', () => {
            expect(window.addEventListener).toHaveBeenCalledTimes(1);
            expect(window.addEventListener).toHaveBeenCalledWith('scroll',);
        });

        it('should call the actions', () => {
            expect(expectedProps.actions.setRSVPData).toHaveBeenCalledTimes(1);
            expect(expectedProps.actions.setMedia).toHaveBeenCalledTimes(1);
        });
    });

    it('should render a LoadingScreen wrapper', () => {
        expect(renderedComponent.type).toBe(LoadingScreen);
    });

    it('should render a wrapper div', () => {
        expect(renderedWrapperDiv.type).toBe('div');
    });

    it('should render an inner div', () => {
        expect(renderedDiv.type).toBe('div');
    });

    it('should render the header image', () => {
        expect(renderedHeaderImage.type).toBe('img');
    });

    it('should render the NavBar component', () => {
        expect(renderedNavBar.type).toBe(NavBar);
    });

    it('should render the Routing component', () => {
        expect(renderedRouting.type).toBe(Routing);
    });

    it('should render the Footer component', () => {
        expect(renderedFooter.type).toBe(Footer);
    });

    it('should render the ModalContainer', () => {
        expect(renderedModalContainer.type).toBe(ModalContainer);
    });
});