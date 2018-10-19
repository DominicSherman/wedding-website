import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';

import Modal from 'react-responsive-modal';
import Switch from 'react-switch';
import AdminMenu from '../../src/modals/AdminMenu';
import {DEV, PROD} from '../../src/constants/constants';

const chance = new Chance();

describe('AdminMenu', () => {
    let expectedProps,

        renderedComponent,

        renderedWrapper,

        renderedEnvDiv,
        renderedPicturesDiv,

        renderedDevText,
        renderedEnvSwitch,
        renderedProdText,

        renderedPicturesText,
        renderedPicturesSwitch;

    const cacheChildren = () => {
        renderedWrapper = renderedComponent.props.children;

        [
            renderedEnvDiv,
            renderedPicturesDiv
        ] = renderedWrapper.props.children;

        [
            renderedDevText,
            renderedEnvSwitch,
            renderedProdText
        ] = renderedEnvDiv.props.children;

        [
            renderedPicturesText,
            renderedPicturesSwitch
        ] = renderedPicturesDiv.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<AdminMenu {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = {
            actions: {
                togglePicturesVisible: jest.fn(),
                toggleAdminMenu: jest.fn(),
                toggleEnv: jest.fn()
            },
            config: {
                env: chance.pickone([DEV, PROD]),
                picturesVisible: chance.bool()
            },
            modalVisible: chance.bool()
        };

        renderComponent();
    });

    it('should render a root Modal', () => {
        expect(renderedComponent.type).toBe(Modal);
        expect(renderedComponent.props.classNames).toEqual({overlay: 'Home-overlay', modal: 'Home-modal'});
        expect(renderedComponent.props.open).toBe(expectedProps.modalVisible);
        expect(renderedComponent.props.onClose).toBe(expectedProps.actions.toggleAdminMenu);
        expect(renderedComponent.props.closeOnOverlayClick).toBeFalsy();
    });

    it('should render a wrapper div', () => {
        expect(renderedWrapper.type).toBe('div');
        expect(renderedWrapper.props.className).toBe('AdminMenu-wrapper column spaceBetween');
    });

    it('should render a div for the env switch', () => {
        expect(renderedEnvDiv.type).toBe('div');
        expect(renderedEnvDiv.props.className).toBe('AdminMenu-wrapper row');
    });

    it('should render text for dev', () => {
        expect(renderedDevText.type).toBe('p');
        expect(renderedDevText.props.className).toBe('AdminMenu-text');
        expect(renderedDevText.props.children).toBe('dev');
    });

    it('should render a switch for env', () => {
        expect(renderedEnvSwitch.type).toBe(Switch);
        expect(renderedEnvSwitch.props.checked).toBe(expectedProps.config.env === PROD);
        expect(renderedEnvSwitch.props.onChange).toBe(expectedProps.actions.toggleEnv);
        expect(renderedEnvSwitch.props.uncheckedIcon).toBeFalsy();
        expect(renderedEnvSwitch.props.checkedIcon).toBeFalsy();
        expect(renderedEnvSwitch.props.offColor).toBe('#f00');
    });

    it('should render text for prod', () => {
        expect(renderedProdText.type).toBe('p');
        expect(renderedProdText.props.className).toBe('AdminMenu-text');
        expect(renderedProdText.props.children).toBe('prod');
    });

    it('should render a div for the pictures switch', () => {
        expect(renderedPicturesDiv.type).toBe('div');
        expect(renderedPicturesDiv.props.className).toBe('AdminMenu-wrapper row');
    });

    it('should render text for show pictures', () => {
        expect(renderedPicturesText.type).toBe('p');
        expect(renderedPicturesText.props.className).toBe('AdminMenu-text');
        expect(renderedPicturesText.props.children).toBe('Show pictures?');
    });

    it('should render a switch for env', () => {
        expect(renderedPicturesSwitch.type).toBe(Switch);
        expect(renderedPicturesSwitch.props.checked).toBe(expectedProps.config.picturesVisible);
        expect(renderedPicturesSwitch.props.onChange).toBe(expectedProps.actions.togglePicturesVisible);
    });
});