import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';

import ModalContainer from '../../src/modals/ModalContainer';
import {DEV, PROD} from '../../src/constants/constants';
import AdminMenu from '../../src/modals/AdminMenu';
import RSVPModal from '../../src/modals/RSVPModal';

const chance = new Chance();

describe('ModalContainer', () => {
    let expectedProps,

        renderedComponent,

        renderedAdminMenu,
        renderedRSVPModal;

    const cacheChildren = () => {
        [
            renderedAdminMenu,
            renderedRSVPModal
        ] = renderedComponent.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<ModalContainer {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = {
            actions: {
                togglePicturesVisible: jest.fn(),
                toggleModalContainer: jest.fn(),
                toggleEnv: jest.fn()
            },
            config: {
                env: chance.pickone([DEV, PROD]),
                picturesVisible: chance.bool()
            },
            adminMenuVisible: chance.bool(),
            rsvpModalVisible: chance.bool(),
            RSVP: chance.string()
        };

        renderComponent();
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
    });

    it('should render AdminMenu', () => {
        expect(renderedAdminMenu.type).toBe(AdminMenu);
        expect(renderedAdminMenu.props.actions).toBe(expectedProps.actions);
        expect(renderedAdminMenu.props.config).toBe(expectedProps.config);
        expect(renderedAdminMenu.props.modalVisible).toBe(expectedProps.adminMenuVisible);
    });

    it('should render RSVPModal', () => {
        expect(renderedRSVPModal.type).toBe(RSVPModal);
        expect(renderedRSVPModal.props.actions).toBe(expectedProps.actions);
        expect(renderedRSVPModal.props.env).toBe(expectedProps.config.env);
        expect(renderedRSVPModal.props.RSVP).toBe(expectedProps.RSVP);
        expect(renderedRSVPModal.props.modalVisible).toBe(expectedProps.rsvpModalVisible);
    });
});