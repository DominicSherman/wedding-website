import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import BrideGroom from '../../src/components/BrideGroom';

const chance = new Chance();

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

        shallowRenderer.render(<BrideGroom {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = {
            image: chance.string(),
            header: chance.string(),
            story: chance.string()
        };

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

    it('should render a middle div', () => {
        expect(renderedMiddleDiv.type).toBe('div');
    });

    it('should the header text', () => {
        expect(renderedHeaderText.type).toBe('p');
        expect(renderedHeaderText.props.className).toBe('OurStory-headerText');
        expect(renderedHeaderText.props.children).toBe(expectedProps.header);
    });

    it('should render a bottom div', () => {
        expect(renderedBottomDiv.type).toBe('div');
    });

    it('should the story text', () => {
        expect(renderedStory.type).toBe('div');
        expect(renderedStory.props.className).toBe('OurStory-bodyText');
        expect(renderedStory.props.children).toBe(expectedProps.story);
    });
});