import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import RSVPForm from '../../src/components/RSVPForm';
import {DEV, PROD} from '../../src/constants/constants';

const chance = new Chance();

describe('RSVPForm', () => {
    let expectedProps,

        renderedInstance,
        renderedComponent,

        renderedButton,
        renderedForm,

        renderedFormDiv,

        renderedNameDiv,
        renderedPartyDiv,
        renderedButtonDiv,

        renderedName,
        renderedNameInput,

        renderedParty,
        renderedPartyInput,

        renderedSubmitButton;

    const cacheChildren = () => {
        [
            renderedButton,
            renderedForm
        ] = renderedComponent.props.children;

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

        renderedSubmitButton = renderedButtonDiv.props.children;
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

    it('should render a wrapper div', () => {
        expect(renderedComponent.type).toBe('div');
    });

    it('should render a button to View RSVPs', () => {
        expect(renderedButton.type).toBe('button');
        expect(renderedButton.props.className).toBe('Buttons-smallFont');

        renderedButton.props.onClick();

        expect(expectedProps.toggleFormVisible).toHaveBeenCalledTimes(1);
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
        expect(renderedName.type).toBe('a');
        expect(renderedName.props.children).toBe('Name: ');
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
        expect(renderedParty.type).toBe('a');
        expect(renderedParty.props.children).toBe('# in Party: ');
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
        expect(renderedButtonDiv.props.className).toBe('RSVPForm center');
    });

    it('should render the submit button', () => {
        expect(renderedSubmitButton.type).toBe('button');
        expect(renderedSubmitButton.props.type).toBe('submit');
        expect(renderedSubmitButton.props.className).toBe('Buttons-mediumFont');
    });
});