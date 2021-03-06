import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WeddingParty from '../../src/screens/WeddingParty';
import {bridesmaids, groomsmen} from '../../src/constants/bridal-party';
import Person from '../../src/components/Person';
import {setPageViewed} from '../../src/services/analytics-service';

jest.mock('../../src/services/analytics-service');

describe('WeddingParty', () => {
    let renderedComponent,
        renderedInstance,

        renderedGroomsmenDiv,
        renderedBridesmaidDiv,

        renderedGroomsmenDisplay,

        renderedBridesmaidDisplay;

    const cacheChildren = () => {
        [
            renderedGroomsmenDiv,
            renderedBridesmaidDiv
        ] = renderedComponent.props.children;

        renderedGroomsmenDisplay = renderedGroomsmenDiv.props.children;
        renderedBridesmaidDisplay = renderedBridesmaidDiv.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<WeddingParty/>);

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
        expect(setPageViewed).toHaveBeenCalledWith('weddingParty');
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
    });

    it('should render a div for the groomsmen', () => {
        expect(renderedGroomsmenDiv.type).toBe('div');
        expect(renderedGroomsmenDiv.props.className).toBe('WeddingParty-groomsmen column');
    });

    it('should render a Person component for each groomsmen', () => {
        renderedGroomsmenDisplay.forEach((person, index) => {
            expect(person.type).toBe(Person);
            expect(person.key).toBe(groomsmen[index].name);
            expect(person.props.info).toBe(groomsmen[index]);
        });
    });

    it('should render a div for the bridesmaids', () => {
        expect(renderedBridesmaidDiv.type).toBe('div');
        expect(renderedBridesmaidDiv.props.className).toBe('WeddingParty-bridesmaids column');
    });

    it('should render a Person component for each bridesmaid', () => {
        renderedBridesmaidDisplay.forEach((person, index) => {
            expect(person.type).toBe(Person);
            expect(person.key).toBe(bridesmaids[index].name);
            expect(person.props.info).toBe(bridesmaids[index]);
        });
    });
});