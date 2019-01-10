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

        renderedInputDiv,
        renderedButtonsDiv,

        renderedNameDiv,
        renderedPartyDiv,

        renderedName,
        renderedNameInput,

        renderedParty,
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

    it('should render text for name', () => {
        expect(renderedName.type).toBe('p');
        expect(renderedName.props.children).toBe('Name')
    });

    describe('name input', () => {
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

        it('should set namePlaceholderVisible onFocus', () => {
            renderedNameInput.props.onFocus();

            expect(renderedInstance.state.namePlaceholderVisible).toBeFalsy();
        });

        it('should set namePlaceholderVisible onBlur if there is no name', () => {
            renderedNameInput.props.onBlur();

            expect(renderedInstance.state.namePlaceholderVisible).toBeTruthy();
        });

        it('should **not** set the namePlaceHolderVisible onBlur if there is a name', () => {
            renderedInstance.setName(chance.string());
            renderedInstance.setNamePlaceholderVisible(false);
            renderedNameInput.props.onBlur();

            expect(renderedInstance.state.namePlaceholderVisible).toBeFalsy();
        });
    });

    it('should render a div for the numberInParty input', () => {
        expect(renderedPartyDiv.type).toBe('div');
    });

    describe('numberInParty input', () => {
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

        it('should set numberInPartyPlaceholderVisible onFocus', () => {
            renderedPartyInput.props.onFocus();

            expect(renderedInstance.state.numberInPartyPlaceholderVisible).toBeFalsy();
        });

        it('should set numberInPartyPlaceholderVisible onBlur if there is no numberInParty', () => {
            renderedPartyInput.props.onBlur();

            expect(renderedInstance.state.numberInPartyPlaceholderVisible).toBeTruthy();
        });

        it('should **not** set the numberInPartyPlaceHolderVisible onBlur if there is a numberInParty', () => {
            renderedInstance.setNumInParty(chance.string());
            renderedInstance.setNumberInPartyPlaceholderVisible(false);
            renderedPartyInput.props.onBlur();

            expect(renderedInstance.state.numberInPartyPlaceholderVisible).toBeFalsy();
        });
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