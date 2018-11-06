import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Registry from '../../src/screens/Registry';
import {setPageViewed} from '../../src/services/analytics-service';

jest.mock('../../src/services/analytics-service');

describe('Registry', () => {
    let renderedComponent,
        renderedInstance;

    const cacheChildren = () => {

    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Registry/>);

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
        expect(setPageViewed).toHaveBeenCalledWith('registry');
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
    });
});