import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Welcome from '../../src/components/Welcome';


describe('Welcome', () => {
    let renderedComponent,

        renderedWrapper,
        renderedText,

        renderedColumnDiv,
        renderedImage,
        renderedSpan,

        renderedWelcomeText,
        renderedGreetingText,

        renderedBoldGreetingText;

    const cacheChildren = () => {
        [
            renderedWrapper,
            renderedText
        ] = renderedComponent.props.children;

        [
            renderedColumnDiv,
            renderedImage,
            renderedSpan
        ] = renderedWrapper.props.children;

        [
            renderedWelcomeText,
            renderedGreetingText
        ] = renderedColumnDiv.props.children;

        renderedBoldGreetingText = renderedGreetingText.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Welcome/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        renderComponent();
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
        expect(renderedComponent.props.className).toBe('Welcome-wrapper column');
    });

    it('should render the wrapper div', () => {
        expect(renderedWrapper.type).toBe('div');
        expect(renderedWrapper.props.className).toBe('row spaceBetween');
    });

    it('should render a column div', () => {
        expect(renderedColumnDiv.type).toBe('div');
        expect(renderedColumnDiv.props.className).toBe('column');
    });

    it('should render the welcome text', () => {
        expect(renderedWelcomeText.type).toBe('p');
        expect(renderedWelcomeText.props.className).toBe('Welcome-headerText');
        expect(renderedWelcomeText.props.children).toBe('Welcome to our website!');
    });

    it('should render the greetings text', () => {
        expect(renderedGreetingText.type).toBe('p');
    });

    it('should render the bold text', () => {
        expect(renderedBoldGreetingText.type).toBe('b');
        expect(renderedBoldGreetingText.props.children).toBe('Greetings from Dominic and Mary!');
    });

    it('should render the image', () => {
        expect(renderedImage.type).toBe('img');
        expect(renderedImage.props.alt).toBe('');
        expect(renderedImage.props.className).toBe('Welcome-bells');
        expect(renderedImage.props.src).toBe(require('../../src/assets/graphics/weddingsbells.png'));
    });

    it('should render the span', () => {
        expect(renderedSpan.type).toBe('span');
        expect(renderedSpan.props.className).toBe('Welcome-bellBorder');
    });

    it('should render the text', () => {
        expect(renderedText.type).toBe('p');
        expect(renderedText.props.children).toBe('You can find information about the wedding, get directions, and RSVP. After the day, pictures uploaded using the app will be viewable in the pictures tab.');
    });
});