import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import HomeButtons from '../../src/components/HomeButtons';

const chance = new Chance();

describe('HomeButtons', () => {
    let expectedProps,
        renderedComponent,

        renderedLeftGraphic,
        renderedRSVPButton,
        renderedDownloadButton,
        renderedRightGraphic;

    const cacheChildren = () => {
        [
            renderedLeftGraphic,
            renderedRSVPButton,
            renderedDownloadButton,
            renderedRightGraphic
        ] = renderedComponent.props.children;
    };
    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<HomeButtons {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = {
            actions: {
                toggleRSVPModal: jest.fn()
            }
        };

        renderComponent();
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
        expect(renderedComponent.props.className).toBe('HomeButtons-wrapper row spaceBetween');
    });

    it('should render the left graphic', () => {
        expect(renderedLeftGraphic.type).toBe('img');
        expect(renderedLeftGraphic.props.alt).toBe('');
        expect(renderedLeftGraphic.props.className).toBe('HomeButtons-graphics');
        expect(renderedLeftGraphic.props.src).toBe(require('../../src/assets/graphics/rsvpleft.png'));
    });

    it('should render the RSVP button', () => {
        expect(renderedRSVPButton.type).toBe('button');
        expect(renderedRSVPButton.props.className).toBe('Buttons-largeFont');
        expect(renderedRSVPButton.props.children).toBe('RSVP');

        renderedRSVPButton.props.onClick();

        expect(expectedProps.actions.toggleRSVPModal).toHaveBeenCalledTimes(1);
    });

    it('should render the download button', () => {
        expect(renderedDownloadButton.type).toBe('button');
        expect(renderedDownloadButton.props.className).toBe('Buttons-mediumFont');
        expect(renderedDownloadButton.props.children).toBe('Download the App');
    });

    it('should render the right graphic', () => {
        expect(renderedRightGraphic.type).toBe('img');
        expect(renderedRightGraphic.props.alt).toBe('');
        expect(renderedRightGraphic.props.className).toBe('HomeButtons-graphics');
        expect(renderedRightGraphic.props.src).toBe(require('../../src/assets/graphics/rsvpright.png'));
    });
});