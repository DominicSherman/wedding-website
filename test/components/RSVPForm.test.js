import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import RSVPForm from '../../src/components/RSVPForm';
import {DEV, PROD} from '../../src/constants/constants';
import {insertRSVP} from '../../src/services/firebase-service';
import {sendEmail} from '../../src/services/email-service';
import {getIsMobile} from '../../src/constants/service';

jest.mock('../../src/services/firebase-service');
jest.mock('../../src/services/email-service');
jest.mock('../../src/constants/service');

const chance = new Chance();

describe('RSVPForm', () => {
    let expectedProps,

        renderedInstance,
        renderedComponent,

        renderedInputDiv,
        renderedButtonsDiv,

        renderedNameDiv,
        renderedPartyDiv,

        renderedNameInput,

        renderedPartyInput,

        renderedSubmitButton,
        renderedViewRSVPButton;

    const cacheChildren = () => {
        [
            renderedInputDiv,
            renderedButtonsDiv
        ] = renderedComponent.props.children;

        [
            renderedNameDiv,
            renderedPartyDiv
        ] = renderedInputDiv.props.children;

        renderedNameInput = renderedNameDiv.props.children;

        renderedPartyInput = renderedPartyDiv.props.children;

        [
            renderedSubmitButton,
            renderedViewRSVPButton
        ] = renderedButtonsDiv.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<RSVPForm {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedInstance = shallowRenderer.getMountedInstance();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = {
            count: chance.natural(),
            env: chance.pickone([DEV, PROD]),
            toggleFormVisible: jest.fn()
        };

        renderComponent();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('handleSubmit', () => {
        let name,
            numInParty;

        describe('when the name and numberInParty is set', () => {
            beforeEach(async () => {
                name = chance.string();
                numInParty = chance.string();

                renderedInstance.setName(name);
                renderedInstance.setNumInParty(numInParty);
                await renderedInstance.handleSubmit();
            });

            it('should insert the RSVP', async () => {
                expect(insertRSVP).toHaveBeenCalledTimes(1);
                expect(insertRSVP).toHaveBeenCalledWith(name, numInParty, expectedProps.env);
            });

            it('should send the email', () => {
                expect(sendEmail).toHaveBeenCalledTimes(1);
                expect(sendEmail).toHaveBeenCalledWith(name, numInParty, expectedProps.count, expectedProps.env);
            });

            it('should reset the state', () => {
                expect(renderedInstance.state).toEqual(renderedInstance.initialState);
            });

            it('should toggle the formVisible', () => {
                expect(expectedProps.toggleFormVisible).toHaveBeenCalledTimes(1);
            });
        });

        describe('when the name is not set', () => {
            it('should do nothing', async () => {
                await renderedInstance.handleSubmit();

                expect(insertRSVP).not.toHaveBeenCalled();
            });
        });

        describe('when the numberInParty is not set', () => {
            it('should do nothing', async () => {
                name = chance.string();
                renderedInstance.setName(name);
                await renderedInstance.handleSubmit();

                expect(insertRSVP).not.toHaveBeenCalled();
            });
        });
    });

    it('should render a wrapper div', () => {
        expect(renderedComponent.type).toBe('div');
    });

    it('should render a div for the inputs', () => {
        expect(renderedInputDiv.type).toBe('div');
    });

    it('should render a div for the name input', () => {
        expect(renderedNameDiv.type).toBe('div');
    });

    it('should render different styles when isMobile', () => {
        getIsMobile.mockReturnValue(true);
        renderComponent();

        expect(renderedNameInput.props.style.fontSize).toBe(8);
        expect(renderedPartyInput.props.style.fontSize).toBe(8);
    });

    it('should render input for name', () => {
        const name = chance.string();

        renderedInstance.setName(name);
        renderedComponent = renderedInstance.render();
        cacheChildren();

        expect(renderedNameInput.type).toBe('input');
        expect(renderedNameInput.props.type).toBe('text');
        expect(renderedNameInput.props.value).toBe(name);
    });

    it('should set the name onChange', () => {
        const name = chance.string();

        renderedNameInput.props.onChange({
            target: {
                value: name
            }
        });

        expect(renderedInstance.state.name).toBe(name);
    });

    it('should render a div for the numberInParty input', () => {
        expect(renderedPartyDiv.type).toBe('div');
    });

    it('should render input for numberInParty', () => {
        const numberInParty = chance.string();

        renderedInstance.setNumInParty(numberInParty);
        renderedComponent = renderedInstance.render();
        cacheChildren();

        expect(renderedPartyInput.type).toBe('input');
        expect(renderedPartyInput.props.type).toBe('text');
        expect(renderedPartyInput.props.value).toBe(numberInParty);
    });

    it('should set the numberInParty onChange', () => {
        const numberInParty = chance.string();

        renderedPartyInput.props.onChange({
            target: {
                value: numberInParty
            }
        });

        expect(renderedInstance.state.numberInParty).toBe(numberInParty);
    });

    it('should render a div for the submit button', () => {
        expect(renderedButtonsDiv.type).toBe('div');
        expect(renderedButtonsDiv.props.className).toBe('RSVPForm spaceEvenly');
    });

    it('should render the submit button', () => {
        expect(renderedSubmitButton.type).toBe('button');
        expect(renderedSubmitButton.props.type).toBe('submit');
        expect(renderedSubmitButton.props.className).toBe('Buttons-mediumFont');
    });

    it('should render a button to View RSVPs', () => {
        expect(renderedViewRSVPButton.type).toBe('button');
        expect(renderedViewRSVPButton.props.className).toBe('Buttons-mediumFont RSVPForm-rsvpsButton');

        renderedViewRSVPButton.props.onClick();

        expect(expectedProps.toggleFormVisible).toHaveBeenCalledTimes(1);
    });
});