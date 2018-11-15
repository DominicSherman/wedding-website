import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import RSVPView from '../../src/components/RSVPView';

const chance = new Chance();

describe('RSVPView', () => {
    let expectedData,
        expectedProps,

        renderedComponent,

        renderedTotalDiv,
        renderedDivider,
        renderedBodyDiv,

        renderedTotalHeader,
        renderedButton,

        renderedNameDiv,
        renderedCountDiv,
        renderedDateDiv,

        renderedNameHeader,
        renderedNames,

        renderedPartyHeader,
        renderedNumbers,

        renderedDateHeader,
        renderedDates;

    const cacheChildren = () => {
        [
            renderedTotalDiv,
            renderedDivider,
            renderedBodyDiv
        ] = renderedComponent.props.children;

        [
            renderedTotalHeader,
            renderedButton,
        ] = renderedTotalDiv.props.children;

        [
            renderedNameDiv,
            renderedCountDiv,
            renderedDateDiv
        ] = renderedBodyDiv.props.children;

        [
            renderedNameHeader,
            renderedNames
        ] = renderedNameDiv.props.children;

        [
            renderedPartyHeader,
            renderedNumbers
        ] = renderedCountDiv.props.children;

        [
            renderedDateHeader,
            renderedDates
        ] = renderedDateDiv.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<RSVPView {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();
    };

    const createRandomRSVP = () => ({
        name: chance.string(),
        numberInParty: chance.natural(),
        date: chance.string()
    });

    beforeEach(() => {
        expectedData = chance.n(createRandomRSVP, chance.d6() + 1);

        expectedProps = {
            count: chance.natural(),
            data: expectedData
        };

        renderComponent();
        cacheChildren();
    });

it('should render a root div', () => {
    expect(renderedComponent.type).toBe('div');
});

it('should render a button to view the form', () => {
    expect(renderedButton.type).toBe('button');
    expect(renderedButton.props.className).toBe('Buttons-smallFont RSVPView-button');
    expect(renderedButton.props.onClick).toBe(expectedProps.toggleFormVisible);
});

it('should render a total div', () => {
    expect(renderedTotalDiv.type).toBe('div');
    expect(renderedTotalDiv.props.className).toBe('RSVPView-header row spaceBetween');
});

it('should render the total header text', () => {
    expect(renderedTotalHeader.type).toBe('h2');
    expect(renderedTotalHeader.props.children).toBe(`Total RSVPs: ${expectedProps.count}`);
});

it('should render the divider', () => {
    expect(renderedDivider.type).toBe('hr');
    expect(renderedDivider.props.className).toBe('RSVPView-divider');
    expect(renderedDivider.props.noshade).toBeTruthy();
});

it('should render the body div', () => {
    expect(renderedBodyDiv.type).toBe('div');
    expect(renderedBodyDiv.props.className).toBe('RSVPView-body row spaceBetween');
});

it('should render a div for a div for the names', () => {
    expect(renderedNameDiv.type).toBe('div');
    expect(renderedNameDiv.props.className).toBe('column spaceEvenly');
});

it('should render header text for Name', () => {
    expect(renderedNameHeader.type).toBe('h3');
    expect(renderedNameHeader.props.children).toBe('Name');
});

it('should render all of the names', () => {
    renderedNames.forEach((renderedName) => {
        expect(renderedName.type).toBe('p');
        expect(renderedName.props.children).toBe(expectedData[renderedName.key].name)
    });
});

it('should render a div for a div for the numbers', () => {
    expect(renderedCountDiv.type).toBe('div');
    expect(renderedCountDiv.props.className).toBe('column spaceEvenly');
});

it('should render header text for Name', () => {
    expect(renderedPartyHeader.type).toBe('h3');
    expect(renderedPartyHeader.props.children).toBe('Number in Party');
});

it('should render all of the numbers', () => {
    renderedNumbers.forEach((renderedNumber) => {
        expect(renderedNumber.type).toBe('p');
        expect(renderedNumber.props.children).toBe(expectedData[renderedNumber.key].numberInParty)
    });
});

it('should render a div for a div for the dates', () => {
    expect(renderedDateDiv.type).toBe('div');
    expect(renderedDateDiv.props.className).toBe('column spaceEvenly');
});

it('should render header text for Date', () => {
    expect(renderedDateHeader.type).toBe('h3');
    expect(renderedDateHeader.props.children).toBe('RSVP Date');
});

it('should render all of the dates', () => {
    renderedDates.forEach((renderedDate) => {
        expect(renderedDate.type).toBe('p');
        expect(renderedDate.props.children).toBe(expectedData[renderedDate.key].date)
    });
});

it('should render no RSVPs yet if there is no data', () => {
    expectedProps.data = [];

    renderComponent();

    const renderedWrapper = renderedComponent.props.children[2];
    const renderedText = renderedWrapper.props.children;

    expect(renderedWrapper.type).toBe('div');
    expect(renderedText.type).toBe('p');
    expect(renderedText.props.children).toBe('No RSVPs yet');
});
})
;