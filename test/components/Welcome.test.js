import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import BrideGroom from '../../src/components/BrideGroom';

const chance = new Chance();

describe('Welcome', () => {
    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<BrideGroom {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };
});