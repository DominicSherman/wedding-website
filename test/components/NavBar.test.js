import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import NavBar from '../../src/components/NavBar';
import HeaderLink from '../../src/components/HeaderLink';

const chance = new Chance();

describe('NavBar', () => {
    let renderedComponent,
        renderedWrapper,

        renderedHomeLink,
        renderedOurStoryLink,
        renderedWeddingPartyLink,
        renderedPicturesLink,
        renderedRegistryLink,

        expectedProps;

    const cacheChildren = () => {
        renderedWrapper = renderedComponent.props.children;

        [
            renderedHomeLink,
            renderedOurStoryLink,
            renderedWeddingPartyLink,
            renderedPicturesLink,
            renderedRegistryLink
        ] = renderedWrapper.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<NavBar {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = {
            isSticky: chance.bool(),
            location: {
                pathname: chance.string()
            }
        };

        renderComponent();
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
        expect(renderedComponent.props.className).toBe('NavBar-wrapper center');
    });

    it('should render a wrapper div', () => {
        expect(renderedWrapper.type).toBe('div');
        expect(renderedWrapper.props.className).toBe('NavBar-body spaceBetween');
    });

    it('should render a HeaderLink for home', () => {
        expect(renderedHomeLink.type).toBe(HeaderLink);
        expect(renderedHomeLink.props.selected).toBe(expectedProps.location.pathname);
        expect(renderedHomeLink.props.route).toBe('/');
        expect(renderedHomeLink.props.text).toBe('HOME');
    });

    it('should render a HeaderLink for our story', () => {
        expect(renderedOurStoryLink.type).toBe(HeaderLink);
        expect(renderedOurStoryLink.props.selected).toBe(expectedProps.location.pathname);
        expect(renderedOurStoryLink.props.route).toBe('/our-story');
        expect(renderedOurStoryLink.props.text).toBe('OUR STORY');
    });

    it('should render a HeaderLink for wedding party', () => {
        expect(renderedWeddingPartyLink.type).toBe(HeaderLink);
        expect(renderedWeddingPartyLink.props.selected).toBe(expectedProps.location.pathname);
        expect(renderedWeddingPartyLink.props.route).toBe('/wedding-party');
        expect(renderedWeddingPartyLink.props.text).toBe('WEDDING PARTY');
    });

    it('should render a HeaderLink for pictures', () => {
        expect(renderedPicturesLink.type).toBe(HeaderLink);
        expect(renderedPicturesLink.props.selected).toBe(expectedProps.location.pathname);
        expect(renderedPicturesLink.props.route).toBe('/pictures');
        expect(renderedPicturesLink.props.text).toBe('PICTURES');
    });

    it('should render a HeaderLink for registry', () => {
        expect(renderedRegistryLink.type).toBe(HeaderLink);
        expect(renderedRegistryLink.props.selected).toBe(expectedProps.location.pathname);
        expect(renderedRegistryLink.props.route).toBe('/registry');
        expect(renderedRegistryLink.props.text).toBe('REGISTRY');
    });
});