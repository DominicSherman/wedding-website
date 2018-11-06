import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Home from '../../src/screens/Home';
import Welcome from '../../src/components/Welcome';
import WeddingBeginsIn from '../../src/components/WeddingBeginsIn';
import HomeInfo from '../../src/components/HomeInfo';
import HomeButtonsContainer from '../../src/containers/HomeButtonsContainer';
import {setPageViewed} from '../../src/services/analytics-service';

jest.mock('../../src/services/analytics-service');

describe('Home', () => {
    let renderedComponent,
        renderedInstance,

        renderedTopDiv,
        renderedBottomDiv,

        renderedWelcome,
        renderedWeddingBegins,

        renderedHomeInfo,
        renderedHomeButtons;

    const cacheChildren = () => {
        [
            renderedTopDiv,
            renderedBottomDiv
        ] = renderedComponent.props.children;

        [
            renderedWelcome,
            renderedWeddingBegins
        ] = renderedTopDiv.props.children;

        [
            renderedHomeInfo,
            renderedHomeButtons
        ] = renderedBottomDiv.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Home/>);

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
        expect(setPageViewed).toHaveBeenCalledWith('home');
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
    });

    it('should render a top div', () => {
        expect(renderedTopDiv.type).toBe('div');
    });

    it('should render the Welcome component', () => {
        expect(renderedWelcome.type).toBe(Welcome);
    });

    it('should render the WeddingBeginsIn component', () => {
        expect(renderedWeddingBegins.type).toBe(WeddingBeginsIn);
    });

    it('should render a bottom div', () => {
        expect(renderedBottomDiv.type).toBe('div');
    });

    it('should render the HomeInfo component', () => {
        expect(renderedHomeInfo.type).toBe(HomeInfo);
    });

    it('should render the HomeButtons component', () => {
        expect(renderedHomeButtons.type).toBe(HomeButtonsContainer);
    });
});