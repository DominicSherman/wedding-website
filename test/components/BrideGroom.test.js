import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import BrideGroom from '../../src/components/BrideGroom';

describe('BrideGroom', () => {
    let expectedProps,
        renderedComponent,

        renderedTopDiv,
        renderedMiddleDiv,
        renderedBottomDiv,

        renderedImage,
        renderedHeaderText,
        renderedStory;

    const cacheChildren = () => {
        [
            renderedTopDiv,
            renderedMiddleDiv,
            renderedBottomDiv
        ] = renderedComponent.props.children;

        renderedImage = renderedTopDiv.props.children;
        renderedHeaderText = renderedMiddleDiv.props.children;
        renderedStory = renderedBottomDiv.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<BrideGroom/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        renderComponent();
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
    });

    it('should render a top div', () => {
        expect(renderedTopDiv.type).toBe('div');
    });

    it('should render the image', () => {
        expect(renderedImage.type).toBe('img');
        expect(renderedImage.props.alt).toBe('');
        expect(renderedImage.props.className).toBe('OurStory-images');
        expect(renderedImage.props.className).toBe('OurStory-images');
    });

    it('should render a bottom div', () => {
        expect(renderedMiddleDiv.type).toBe('div');
    });

    it('should render a bottom div', () => {
        expect(renderedBottomDiv.type).toBe('div');
    });
});