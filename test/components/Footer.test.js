import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Footer from '../../src/components/Footer';

describe('Footer', () => {
    let renderedComponent,

        renderedTopDiv,
        renderedBottomDiv,
        renderedText,

        renderedLogo,

        renderedRingMark,
        renderedOregonMark;

    const cacheChildren = () => {
        [
            renderedTopDiv,
            renderedBottomDiv,
            renderedText
        ] = renderedComponent.props.children;

        renderedLogo = renderedTopDiv.props.children;

        [
            renderedRingMark,
            renderedOregonMark
        ] = renderedBottomDiv.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Footer/>);

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

    it('should render the logo', () => {
        expect(renderedLogo.type).toBe('img');
        expect(renderedLogo.props.alt).toBe('');
        expect(renderedLogo.props.className).toBe('Footer-images');
        expect(renderedLogo.props.src).toBe(require('../../src/assets/graphics/D&M-logo.png'));
    });

    it('should render a bottom div', () => {
        expect(renderedBottomDiv.type).toBe('div');
    });

    it('should render the ringMark', () => {
        expect(renderedRingMark.type).toBe('img');
        expect(renderedRingMark.props.alt).toBe('');
        expect(renderedRingMark.props.className).toBe('Footer-images');
        expect(renderedRingMark.props.src).toBe(require('../../src/assets/graphics/Ring-mark.png'));
    });

    it('should render the oregonMark', () => {
        expect(renderedOregonMark.type).toBe('img');
        expect(renderedOregonMark.props.alt).toBe('');
        expect(renderedOregonMark.props.className).toBe('Footer-images');
        expect(renderedOregonMark.props.src).toBe(require('../../src/assets/graphics/Oregon-mark.png'));
    });

    it('should text in the footer', () => {
        expect(renderedText.type).toBe('p');
        expect(renderedText.props.className).toBe('Footer-text center');
        expect(renderedText.props.children).toBe('Built by Dominic Sherman | Designed by Michael Sherman');
    });
});