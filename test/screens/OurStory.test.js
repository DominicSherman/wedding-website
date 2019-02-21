import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import ImageGallery from 'react-image-gallery';

import OurStory from '../../src/screens/OurStory';
import BrideGroom from '../../src/components/BrideGroom';
import maryStory from '../../src/constants/mary-story';
import dominicStory from '../../src/constants/dominic-story';
import {photos} from '../../src/constants/photo-gallery';
import {setPageViewed} from '../../src/services/analytics-service';

jest.mock('../../src/services/analytics-service');

const chance = new Chance();

describe('OurStory', () => {
    let renderedComponent,
        renderedInstance,

        renderedTopDiv,
        renderedDivider,
        renderedPhotosHeader,
        renderedBottomDiv,

        renderedBrideDiv,
        renderedGroomDiv,

        renderedImageGallery,

        renderedBrideComponent,

        renderedGroomComponent;

    const cacheChildren = () => {
        [
            renderedTopDiv,
            renderedDivider,
            renderedPhotosHeader,
            renderedBottomDiv
        ] = renderedComponent.props.children;

        [
            renderedBrideDiv,
            renderedGroomDiv
        ] = renderedTopDiv.props.children;

        renderedImageGallery = renderedBottomDiv.props.children;

        renderedBrideComponent = renderedBrideDiv.props.children;

        renderedGroomComponent = renderedGroomDiv.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<OurStory/>);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedInstance = shallowRenderer.getMountedInstance();

        cacheChildren();
    };

    beforeEach(() => {
        renderComponent();
    });

    it('should set page viewed on componentDidMount', () => {
        renderedInstance.componentDidMount();

        expect(setPageViewed).toHaveBeenCalledTimes(1);
        expect(setPageViewed).toHaveBeenCalledWith('ourStory');
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
    });

    it('should render a top div', () => {
        expect(renderedTopDiv.type).toBe('div');
    });

    it('should render a div for the bride', () => {
        expect(renderedBrideDiv.type).toBe('div');
        expect(renderedBrideDiv.props.className).toBe('OurStory-wrapper column');
    });

    it('should render a component for the bride', () => {
        expect(renderedBrideComponent.type).toBe(BrideGroom);
        expect(renderedBrideComponent.props.image).toBe(require('../../src/assets/our-story/bride.jpg'));
        expect(renderedBrideComponent.props.header).toBe('THE BRIDE');
        expect(renderedBrideComponent.props.story).toBe(maryStory);
    });

    it('should render a div for the groom', () => {
        expect(renderedGroomDiv.type).toBe('div');
        expect(renderedGroomDiv.props.className).toBe('OurStory-wrapper column');
    });

    it('should render a component for the groom', () => {
        expect(renderedGroomComponent.type).toBe(BrideGroom);
        expect(renderedGroomComponent.props.image).toBe(require('../../src/assets/our-story/groom.jpg'));
        expect(renderedGroomComponent.props.header).toBe('THE GROOM');
        expect(renderedGroomComponent.props.story).toBe(dominicStory);
    });

    it('should render the divider', () => {
        expect(renderedDivider.type).toBe('hr');
        expect(renderedDivider.props.className).toBe('OurStory-divider');
        expect(renderedDivider.props.noshade).toBeTruthy();
    });

    it('should render header text for photos', () => {
        expect(renderedPhotosHeader.type).toBe('p');
        expect(renderedPhotosHeader.props.className).toBe('OurStory-headerText2');
        expect(renderedPhotosHeader.props.children).toBe('PHOTOS');
    });

    it('should render a bottom div', () => {
        expect(renderedBottomDiv.type).toBe('div');
    });

    it('should render the ImageGallery', () => {
        expect(renderedImageGallery.type).toBe(ImageGallery);
        expect(renderedImageGallery.props.additionalClass).toBe('OurStory-imageGallery');
        expect(renderedImageGallery.props.items).toBe(photos);
    });

    it('should render a div and img for each item', () => {
        global.window = {
            screenTop: true,
            screenY: true
        };
        const expectedItem = {
            description: chance.string(),
            original: chance.string()
        };

        const renderedItem = renderedImageGallery.props.renderItem(expectedItem);
        let renderedImage, renderedCaption;
        [
            renderedImage,
            renderedCaption
        ] = renderedItem.props.children;

        expect(renderedItem.type).toBe('div');
        expect(renderedItem.props.style).toBe(undefined);
        expect(renderedImage.type).toBe('img');
        expect(renderedImage.props.src).toBe(expectedItem.original);
        expect(renderedCaption.type).toBe('div');
        expect(renderedCaption.props.children).toBe(expectedItem.description);
    });

    it('should render a style if there is not screenTop or screenY', () => {
        global.window = {
            screenTop: false,
            screenY: false
        };
        const expectedItem = {
            description: chance.string(),
            original: chance.string()
        };

        const renderedItem = renderedImageGallery.props.renderItem(expectedItem);

        expect(renderedItem.props.style).toEqual({
            height: '50%',
            width: '50%'
        });
    });
});