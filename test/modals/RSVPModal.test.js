import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import Modal from 'react-responsive-modal';

import RSVPModal from '../../src/modals/RSVPModal';
import RSVPForm from '../../src/components/RSVPForm';
import RSVPView from '../../src/components/RSVPView';

const chance = new Chance();

describe('RSVPModal', () => {
    let expectedProps,

        renderedInstance,
        renderedComponent,

        renderedFormOrView;

    const cacheChildren = () => {
        renderedFormOrView = renderedComponent.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<RSVPModal {...expectedProps}/>);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedInstance = shallowRenderer.getMountedInstance();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = {
            actions: {
                toggleRSVPModal: jest.fn()
            },
            env: chance.string(),
            modalVisible: chance.bool(),
            RSVP: {
                count: chance.natural(),
                data: chance.string()
            }
        };

        renderComponent();
    });

    it('should render a root Modal', () => {
        expect(renderedComponent.type).toBe(Modal);
        expect(renderedComponent.props.open).toBe(expectedProps.modalVisible);
        expect(renderedComponent.props.onClose).toBe(expectedProps.actions.toggleRSVPModal);
    });

    it('should render the RSVP form initially', () => {
        expect(renderedFormOrView.type).toBe(RSVPForm);
        expect(renderedFormOrView.props.env).toBe(expectedProps.env);
        expect(renderedFormOrView.props.toggleFormVisible).toBe(renderedInstance.toggleFormVisible);
    });

    it('should render the RSVP View if formVisible has been toggled', () => {
        renderedInstance.toggleFormVisible();
        renderedComponent = renderedInstance.render();
        cacheChildren();

        expect(renderedFormOrView.type).toBe(RSVPView);
        expect(renderedFormOrView.props.data).toBe(expectedProps.RSVP.data);
        expect(renderedFormOrView.props.count).toBe(expectedProps.RSVP.count);
        expect(renderedFormOrView.props.toggleFormVisible).toBe(renderedInstance.toggleFormVisible);
    });
});