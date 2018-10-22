import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Registry from '../../src/screens/Registry';

describe('Registry', () => {
    let renderedComponent;

    const cacheChildren = () => {

    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Registry/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        renderComponent();
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
    });
});