import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import Gallery from 'react-photo-gallery';

import Pictures from '../../src/screens/Pictures';
import {setPageViewed} from '../../src/services/analytics-service';

jest.mock('../../src/services/analytics-service');

const chance = new Chance();

describe('Pictures', () => {
    let expectedProps,

        renderedComponent,
        renderedInstance;

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Pictures {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedInstance = shallowRenderer.getMountedInstance();
    };

    beforeEach(() => {
        expectedProps = {
            config: {
                picturesVisible: chance.bool()
            },
            pictures: chance.n(() => ({
                height: chance.natural(),
                src: chance.string(),
                width: chance.natural()
            }), chance.d6() + 1)
        };
    });

    it('should set page viewed on componentDidMount', () => {
        renderComponent();
        renderedInstance.componentDidMount();

        expect(setPageViewed).toHaveBeenCalledTimes(1);
        expect(setPageViewed).toHaveBeenCalledWith('pictures');
    });

    describe('when picturesVisible is false', () => {
        let renderedText;

        const cacheChildren = () => {
            renderedText = renderedComponent.props.children;
        };

        beforeEach(() => {
            expectedProps = {
                ...expectedProps,
                config: {
                    picturesVisible: false
                }
            };

            renderComponent();
            cacheChildren();
        });

        it('should render a root div', () => {
            expect(renderedComponent.type).toBe('div');
            expect(renderedComponent.props.className).toBe('Pictures-wrapper');
        });

        it('should render text', () => {
            expect(renderedText.type).toBe('p');
            expect(renderedText.props.className).toBe('Pictures-text');
            expect(renderedText.props.children).toBe('🎉 Pictures from the wedding day can be viewed here starting on May 28th! 🎉');
        });
    });

    describe('when picturesVisible is true and there are not pictures', () => {
        let renderedText;

        const cacheChildren = () => {
            renderedText = renderedComponent.props.children;
        };

        beforeEach(() => {
            expectedProps = {
                config: {
                    picturesVisible: true
                },
                pictures: []
            };

            renderComponent();
            cacheChildren();
        });

        it('should render a root div', () => {
            expect(renderedComponent.type).toBe('div');
            expect(renderedComponent.props.className).toBe('Pictures-wrapper');
        });

        it('should render text', () => {
            expect(renderedText.type).toBe('p');
            expect(renderedText.props.className).toBe('Pictures-text');
            expect(renderedText.props.children).toBe('No pictures have been uploaded yet 😕');
        });
    });

    describe('when picturesVisible is true and there are pictures', () => {
        let renderedGallery;

        const cacheChildren = () => {
            renderedGallery = renderedComponent.props.children;
        };

        beforeEach(() => {
            expectedProps = {
                ...expectedProps,
                config: {
                    picturesVisible: true
                }
            };

            renderComponent();
            cacheChildren();
        });

        it('should render a root div', () => {
            expect(renderedComponent.type).toBe('div');
        });

        it('should render text', () => {
            expect(renderedGallery.type).toBe(Gallery);
            expect(renderedGallery.props.photos).toBe(expectedProps.pictures);
        });
    });
});