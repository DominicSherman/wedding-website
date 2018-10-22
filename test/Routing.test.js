import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Route} from 'react-router-dom';
import Routing from '../src/Routing';
import Home from '../src/screens/Home';
import OurStory from '../src/screens/OurStory';
import WeddingParty from '../src/screens/WeddingParty';
import Registry from '../src/screens/Registry';
import PicturesContainer from '../src/containers/PicturesContainer';

const chance = new Chance();

describe('Routing', () => {
    let expectedProps,
        expectedRenderProps,

        renderedComponent,

        renderedHomeRoute,
        renderedOurStoryRoute,
        renderedWeddingPartyRoute,
        renderedPicturesRoute,
        renderedRegistryRoute;

    const cacheChildren = () => {
        [
            renderedHomeRoute,
            renderedOurStoryRoute,
            renderedWeddingPartyRoute,
            renderedPicturesRoute,
            renderedRegistryRoute
        ] = renderedComponent.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Routing {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = {
            isSticky: chance.bool()
        };
        expectedRenderProps = {
            location: chance.string()
        };

        renderComponent();
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
    });

    it('should render the root div with marginTop of 7.68% if isSticky', () => {
        expectedProps.isSticky = true;
        renderComponent();

        expect(renderedComponent.props.style.marginTop).toBe('7.68%');
    });

    it('should render the root div with marginTop of 0 if not isSticky', () => {
        expectedProps.isSticky = false;
        renderComponent();

        expect(renderedComponent.props.style.marginTop).toBe('0');
    });

    it('should render a route for Home', () => {
        expect(renderedHomeRoute.type).toBe(Route);
        expect(renderedHomeRoute.props.exact).toBeTruthy();
        expect(renderedHomeRoute.props.path).toBe('/');

        const routeComponent = renderedHomeRoute.props.render(expectedRenderProps);

        expect(routeComponent.type).toBe(Home);
        expect(routeComponent.props.location).toBe(expectedRenderProps.location);
    });

    it('should render a route for OurStory', () => {
        expect(renderedOurStoryRoute.type).toBe(Route);
        expect(renderedOurStoryRoute.props.exact).toBeTruthy();
        expect(renderedOurStoryRoute.props.path).toBe('/our-story');

        const rendered = renderedOurStoryRoute.props.render(expectedRenderProps);

        expect(rendered.type).toBe(OurStory);
        expect(rendered.props.location).toBe(expectedRenderProps.location);
    });

    it('should render a route for WeddingParty', () => {
        expect(renderedWeddingPartyRoute.type).toBe(Route);
        expect(renderedWeddingPartyRoute.props.exact).toBeTruthy();
        expect(renderedWeddingPartyRoute.props.path).toBe('/wedding-party');

        const routeComponent = renderedWeddingPartyRoute.props.render(expectedRenderProps);

        expect(routeComponent.type).toBe(WeddingParty);
        expect(routeComponent.props.location).toBe(expectedRenderProps.location);
    });

    it('should render a route for Pictures', () => {
        expect(renderedPicturesRoute.type).toBe(Route);
        expect(renderedPicturesRoute.props.exact).toBeTruthy();
        expect(renderedPicturesRoute.props.path).toBe('/pictures');

        const routeComponent = renderedPicturesRoute.props.render(expectedRenderProps);

        expect(routeComponent.type).toBe(PicturesContainer);
        expect(routeComponent.props.location).toBe(expectedRenderProps.location);
    });

    it('should render a route for Registry', () => {
        expect(renderedRegistryRoute.type).toBe(Route);
        expect(renderedRegistryRoute.props.exact).toBeTruthy();
        expect(renderedRegistryRoute.props.path).toBe('/registry');

        const routeComponent = renderedRegistryRoute.props.render(expectedRenderProps);

        expect(routeComponent.type).toBe(Registry);
        expect(routeComponent.props.location).toBe(expectedRenderProps.location);
    });
});