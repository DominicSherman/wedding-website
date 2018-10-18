import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';

const chance = new Chance();

describe('WeddingBeginsIn', () => {
    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<BrideGroom {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };
});