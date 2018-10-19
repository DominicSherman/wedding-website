import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import Person from '../../src/components/Person';

const chance = new Chance();

describe('Person', () => {
    let expectedProps,

        renderedComponent,

        renderedImageDiv,
        renderedInfoDiv,

        renderedImage,

        renderedName,
        renderedRelation,
        renderedBio,

        renderedBoldName;

    const cacheChildren = () => {
        [
            renderedImageDiv,
            renderedInfoDiv
        ] = renderedComponent.props.children;

        renderedImage = renderedImageDiv.props.children;

        [
            renderedName,
            renderedRelation,
            renderedBio
        ] = renderedInfoDiv.props.children;

        renderedBoldName = renderedName.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Person {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = {
            info: {
                name: chance.string(),
                role: chance.string(),
                relation: chance.string(),
                bio: chance.string()
            }
        };

        renderComponent();
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
        expect(renderedComponent.props.className).toBe('Person-wrapper row');
    });

    it('should render a div for the image', () => {
        expect(renderedImageDiv.type).toBe('div');
        expect(renderedImageDiv.props.className).toBe('Person-imageWrapper');
    });

    it('should render the image', () => {
        expect(renderedImage.type).toBe('img');
        expect(renderedImage.props.alt).toBe('');
        expect(renderedImage.props.className).toBe('Person-image');
        expect(renderedImage.props.src).toBe(expectedProps.info.image);
    });

    it('should render a div for the information', () => {
        expect(renderedInfoDiv.type).toBe('div');
        expect(renderedInfoDiv.props.className).toBe('Person-text column spaceEvenly');
    });

    it('should render the name and role wrapper', () => {
        expect(renderedName.type).toBe('p');
    });

    it('should render the bold name and role', () => {
        expect(renderedBoldName.type).toBe('b');
        expect(renderedBoldName.props.children).toBe(`${expectedProps.info.name} - ${expectedProps.info.role}`);
    });

    it('should render the relation', () => {
        expect(renderedRelation.type).toBe('p');
        expect(renderedRelation.props.children).toBe(`${expectedProps.info.relation}`);
    });

    it('should render the bio', () => {
        expect(renderedBio.type).toBe('p');
        expect(renderedBio.props.children).toBe(`${expectedProps.info.bio}`);
    });
});