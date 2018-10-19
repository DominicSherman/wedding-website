import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WeddingBeginsIn from '../../src/components/WeddingBeginsIn';

describe('WeddingBeginsIn', () => {
    let renderedComponent,
        renderedInstance,

        renderedTopDiv,
        renderedBottomDiv,

        renderedWeddingBeginsText,

        renderedDaysText;

    const cacheChildren = () => {
        [
            renderedTopDiv,
            renderedBottomDiv
        ] = renderedComponent.props.children;

        renderedWeddingBeginsText = renderedTopDiv.props.children;

        renderedDaysText = renderedBottomDiv.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<WeddingBeginsIn/>);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedInstance = shallowRenderer.getMountedInstance();

        cacheChildren();
    };

    beforeEach(() => {
        renderComponent();
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
        expect(renderedComponent.props.className).toBe('WeddingBeginsIn-wrapper column spaceBetween');
    });

    it('should render a top div', () => {
        expect(renderedTopDiv.type).toBe('div');
        expect(renderedTopDiv.props.className).toBe('WeddingBeginsIn-weddingBegins');
    });

    it('should render the wedding begins in text', () => {
        expect(renderedWeddingBeginsText.type).toBe('p');
        expect(renderedWeddingBeginsText.props.className).toBe('WeddingBeginsIn-weddingBeginsText');
        expect(renderedWeddingBeginsText.props.children).toBe('Wedding begins in');
    });

    it('should render the bottom div', () => {
        expect(renderedBottomDiv.type).toBe('div');
        expect(renderedBottomDiv.props.className).toBe('WeddingBeginsIn-daysLeft');
    });

    it('should render the days text', () => {
        expect(renderedDaysText.type).toBe('p');
        expect(renderedDaysText.props.className).toBe('WeddingBeginsIn-daysLeftText');
        expect(renderedDaysText.props.children).toBe(`${renderedInstance.calculateDaysLeft()} DAYS`);
    });
});