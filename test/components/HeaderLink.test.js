import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import {NavLink} from 'react-router-dom';

import HeaderLink from '../../src/components/HeaderLink';

const chance = new Chance();

describe('HeaderLink', () => {
    let expectedProps,
        renderedComponent,
        renderedText;

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<HeaderLink {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedText = renderedComponent.props.children;
    };

    beforeEach(() => {
        expectedProps = {
            selected: chance.string(),
            route: chance.string(),
            text: chance.string()
        };

        renderComponent();
    });

    it('should render a NavLink', () => {
        expect(renderedComponent.type).toBe(NavLink);
        expect(renderedComponent.props.className).toBe('HeaderLink-link');
        expect(renderedComponent.props.to).toBe(expectedProps.route.toString());
    });

    it('should render text', () => {
        expect(renderedText.type).toBe('p');
        expect(renderedText.props.className).toBe('HeaderLink-headerText');
    });

    it('should give a color if it is the selected route', () => {
        expectedProps.selected = expectedProps.route;
        renderComponent();

        expect(renderedText.props.style.color).toBe('#f2ac5e');
    });
});