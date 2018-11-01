import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import RSVPForm from '../../src/components/RSVPForm';
import {DEV, PROD} from '../../src/constants/constants';
import {insertRSVP} from '../../src/services/firebase-service';

jest.mock('../../src/services/firebase-service');

const chance = new Chance();

describe('RSVPForm', () => {
    let expectedProps,

        renderedInstance,
        renderedComponent,

        renderedForm,

        renderedFormDiv,

        renderedNameDiv,
        renderedPartyDiv,
        renderedButtonDiv,

        renderedName,
        renderedNameInput,

        renderedParty,
        renderedPartyInput,

        renderedSubmitButton,
        renderedViewRSVPButton;

    const cacheChildren = () => {
        renderedForm = renderedComponent.props.children;

        renderedFormDiv = renderedForm.props.children;

        [
            renderedNameDiv,
            renderedPartyDiv,
            renderedButtonDiv
        ] = renderedFormDiv.props.children;

        [
            renderedName,
            renderedNameInput
        ] = renderedNameDiv.props.children;

        [
            renderedParty,
            renderedPartyInput
        ] = renderedPartyDiv.props.children;

        [
            renderedSubmitButton,
            renderedViewRSVPButton
        ] = renderedButtonDiv.props.children;
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
            env: chance.pickone([DEV, PROD]),
            toggleFormVisible: jest.fn()
        };

        renderComponent();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('handleSubmit', () => {
        let expectedEvent,
            preventDefaultSpy;

        beforeEach(() => {
            preventDefaultSpy = jest.fn();
            expectedEvent = {
                preventDefault: preventDefaultSpy
            };
        });

        it('should prevent the default event', async () => {
            await renderedInstance.handleSubmit(expectedEvent);

            expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
        });

        it('should insert the RSVP', async () => {
            const name = chance.string();
            const numInParty = chance.string();

            renderedInstance.setName(name);
            renderedInstance.setNumInParty(numInParty);
            await renderedInstance.handleSubmit(expectedEvent);

            expect(insertRSVP).toHaveBeenCalledTimes(1);
            expect(insertRSVP).toHaveBeenCalledWith(name, numInParty, expectedProps.env);
        });
    });

    it('should render a wrapper div', () => {
        expect(renderedComponent.type).toBe('div');
    });

    it('should render a form', () => {
        expect(renderedForm.type).toBe('form');
        expect(renderedForm.props.onSubmit).toBe(renderedInstance.handleSubmit);
    });

    it('should render a wrapper div for the form', () => {
        expect(renderedFormDiv.type).toBe('div');
        expect(renderedFormDiv.props.className).toBe('column center');
    });

    it('should render a div for the name input', () => {
        expect(renderedNameDiv.type).toBe('div');
        expect(renderedNameDiv.props.className).toBe('RSVPForm spaceBetween');
    });

    it('should render text for name', () => {
        expect(renderedName.type).toBe('b');
        const item = renderedName.props.children;

        expect(item.type).toBe('a');
        expect(item.props.children).toBe('Name: ');
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
        renderedComponent = renderedInstance.render();
        cacheChildren();

        expect(renderedNameInput.props.value).toBe(name);
    });

    it('should render a div for the numberInParty input', () => {
        expect(renderedPartyDiv.type).toBe('div');
        expect(renderedPartyDiv.props.className).toBe('RSVPForm spaceBetween');
    });

    it('should render text for numberInParty', () => {
        expect(renderedParty.type).toBe('b');
        const item = renderedParty.props.children;

        expect(item.type).toBe('a');
        expect(item.props.children).toBe('# in party: ');
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
        renderedComponent = renderedInstance.render();
        cacheChildren();

        expect(renderedPartyInput.props.value).toBe(numberInParty);
    });

    it('should render a div for the submit button', () => {
        expect(renderedButtonDiv.type).toBe('div');
        expect(renderedButtonDiv.props.className).toBe('RSVPForm spaceEvenly');
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