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
import {DEV, PROD} from '../src/constants/constants';

jest.mock('../src/services/firebase-service');
jest.useFakeTimers();

const chance = new Chance();

describe('Main', () => {
    let expectedProps,
        expectedScrollY,
        expectedClientHeight,
        getElementByIdSpy,
        eventListener,

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
        expectedProps = {
            actions: {
                toggleAdminMenu: jest.fn(),
                setRSVPData: jest.fn(),
                setMedia: jest.fn()
            },
            config: {
                env: chance.pickone([DEV, PROD]),
            },
            location: chance.string()
        };

        expectedScrollY = chance.natural();
        expectedClientHeight = expectedScrollY + 1;
        getElementByIdSpy = jest.fn();

        global.document = {
            getElementById: getElementByIdSpy,
        };

        global.window = {
            addEventListener: jest.fn(),
            scrollY: expectedScrollY
        };

        getElementByIdSpy.mockReturnValue({clientHeight: expectedClientHeight});

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

            eventListener = window.addEventListener.mock.calls[0][1];
        });

        it('should call getElementById', () => {
            expect(document.getElementById).toHaveBeenCalledTimes(1);
            expect(document.getElementById).toHaveBeenCalledWith('headerImageWrapper');
        });

        it('should add an event listener', () => {
            expect(window.addEventListener).toHaveBeenCalledTimes(1);
            expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.anything());
        });

        it('should set isSticky to true when scrollY is greater than clientHeight and isSticky is false', () => {
            expectedScrollY = expectedClientHeight + 1;
            global.window = {
                addEventListener: jest.fn(),
                scrollY: expectedScrollY
            };
            renderedInstance.setIsSticky(false);

            eventListener();
            renderedComponent = renderedInstance.render();
            cacheChildren();

            expect(renderedNavBar.props.isSticky).toBe(true);
        });

        it('should set isSticky to false when scrollY is less than clientHeight and isSticky is true', () => {
            expectedScrollY = expectedClientHeight - 1;
            global.window = {
                addEventListener: jest.fn(),
                scrollY: expectedScrollY
            };
            renderedInstance.setIsSticky(true);

            eventListener();
            renderedComponent = renderedInstance.render();
            cacheChildren();

            expect(renderedNavBar.props.isSticky).toBe(false);
        });

        it('should do nothing when scrollY is less than clientHeight and isSticky is false', () => {
            expectedScrollY = expectedClientHeight - 1;
            global.window = {
                addEventListener: jest.fn(),
                scrollY: expectedScrollY
            };
            renderedInstance.setIsSticky(false);

            eventListener();
            renderedComponent = renderedInstance.render();
            cacheChildren();

            expect(renderedNavBar.props.isSticky).toBe(false);
        });

        it('should call the actions', () => {
            expect(expectedProps.actions.setRSVPData).toHaveBeenCalledTimes(1);
            expect(expectedProps.actions.setMedia).toHaveBeenCalledTimes(1);
        });
    });

    describe('componentDidUpdate', () => {
        let expectedPrevProps;

        it('should call scrollTo if the location changes', () => {
            renderedInstance.componentDidMount();

            global.window = {
                scrollTo: jest.fn()
            };

            expectedPrevProps = {
                ...expectedProps,
                location: chance.string()
            };

            renderedInstance.componentDidUpdate(expectedPrevProps);

            expect(window.scrollTo).toHaveBeenCalledTimes(1);
            expect(window.scrollTo).toHaveBeenCalledWith({
                top: expectedClientHeight,
                behavior: 'smooth'
            });
        });

        it('should call setTimeout once incrementPresses have been called', () => {
            renderedInstance.incrementPresses();
            renderedInstance.componentDidUpdate(expectedProps);

            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(setTimeout).toHaveBeenCalledWith(renderedInstance.resetPresses, 5000);
        });

        it('should **not** call setTimeout if incrementPresses has not been called', () => {
            renderedInstance.componentDidUpdate(expectedProps);

            expect(setTimeout).not.toHaveBeenCalled();
        });

        it('should toggle the admin menu if there are 10 presses', () => {
            for (let i = 0; i < 10; i++) {
                renderedInstance.incrementPresses();
            }
            renderedInstance.componentDidUpdate(expectedProps);

            expect(expectedProps.actions.toggleAdminMenu).toHaveBeenCalledTimes(1);
        });

        it('should not toggle the admin menu if there have not been 10 presses', () => {
            const numPresses = chance.natural({
                max: 9,
                min: 0
            });
            for (let i = 0; i < numPresses; i++) {
                renderedInstance.incrementPresses();
            }
            renderedInstance.componentDidUpdate(expectedProps);

            expect(expectedProps.actions.toggleAdminMenu).not.toHaveBeenCalled();
        });

        it('should set the RSVP data and the media again if the env has changed', () => {
            expectedPrevProps = {
                ...expectedProps,
                config: {
                    env: chance.string()
                }
            };
            renderedInstance.componentDidUpdate(expectedPrevProps);

            expect(expectedProps.actions.setRSVPData).toHaveBeenCalledTimes(1);
            expect(expectedProps.actions.setMedia).toHaveBeenCalledTimes(1);
        });
    });

    it('should render a LoadingScreen wrapper', () => {
        expect(renderedComponent.type).toBe(LoadingScreen);
        expect(renderedComponent.props.loading).toBe(true);
    });

    it('should render a wrapper div', () => {
        expect(renderedWrapperDiv.type).toBe('div');
    });

    it('should render an inner div', () => {
        expect(renderedDiv.type).toBe('div');
        expect(renderedDiv.props.id).toBe('headerImageWrapper');
        expect(renderedDiv.props.className).toBe('Main-wrapper');
    });

    it('should render the header image', () => {
        expect(renderedHeaderImage.type).toBe('img');
        expect(renderedHeaderImage.props.alt).toBe('');
        expect(renderedHeaderImage.props.className).toBe('Main-image');
        expect(renderedHeaderImage.props.src).toBe(require('../src/assets/header.jpg'));

        renderedHeaderImage.props.onLoad();
        renderedComponent = renderedInstance.render();

        expect(renderedComponent.props.loading).toBe(false);
    });

    it('should render the NavBar component', () => {
        expect(renderedNavBar.type).toBe(NavBar);
        expect(renderedNavBar.props.isSticky).toBe(false);
        expect(renderedNavBar.props.location).toBe(expectedProps.location);
    });

    it('should render the Routing component', () => {
        expect(renderedRouting.type).toBe(Routing);
        expect(renderedRouting.props.isSticky).toBe(false);
    });

    it('should render the Footer component', () => {
        expect(renderedFooter.type).toBe(Footer);
    });

    it('should render the ModalContainer', () => {
        expect(renderedModalContainer.type).toBe(ModalContainer);
        expect(renderedModalContainer.props).toEqual(expectedProps);
    });
});