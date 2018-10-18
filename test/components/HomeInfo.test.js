import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import HomeInfo from '../../src/components/HomeInfo';
import {holyRosaryLink, mcmenaminsLink} from '../../src/constants/constants';

describe('HomeInfo', () => {
    let renderedComponent,

        renderedCeremonyDiv,
        renderedReceptionDiv,
        renderedLeftSpan,

        renderedCeremonyTextDiv,
        renderedCeremonyLogoDiv,

        renderedReceptionLogoDiv,
        renderedReceptionTextDiv,

        renderedCeremonyHeaderText,
        renderedChurchNameText,
        renderedCeremonyDateText,
        renderedChurchAddressLink,

        renderedCeremonyLogo,
        renderedTopRightSpan,

        renderedReceptionLogo,

        renderedReceptionHeaderText,
        renderedMcMenaminsNameText,
        renderedReceptionDateText,
        renderedMcMenaminsAddressLink,
        renderedBottomRightSpan,

        renderedChurchAddressText,
        renderedMcMenaminsAddressText;

    const cacheChildren = () => {
        [
            renderedCeremonyDiv,
            renderedReceptionDiv,
            renderedLeftSpan
        ] = renderedComponent.props.children;

        [
            renderedCeremonyTextDiv,
            renderedCeremonyLogoDiv
        ] = renderedCeremonyDiv.props.children;

        [
            renderedReceptionLogoDiv,
            renderedReceptionTextDiv
        ] = renderedReceptionDiv.props.children;

        [
            renderedCeremonyHeaderText,
            renderedChurchNameText,
            renderedCeremonyDateText,
            renderedChurchAddressLink,
            renderedBottomRightSpan
        ] = renderedCeremonyTextDiv.props.children;

        [
            renderedCeremonyLogo,
            renderedTopRightSpan
        ] = renderedCeremonyLogoDiv.props.children;

        renderedReceptionLogo = renderedReceptionLogoDiv.props.children;

        [
            renderedReceptionHeaderText,
            renderedMcMenaminsNameText,
            renderedReceptionDateText,
            renderedMcMenaminsAddressLink,
            renderedBottomRightSpan
        ] = renderedReceptionTextDiv.props.children;

        renderedChurchAddressText = renderedChurchAddressLink.props.children;

        renderedMcMenaminsAddressText = renderedMcMenaminsAddressLink.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<HomeInfo/>);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        renderComponent();
    });

    it('should render a root div', () => {
        expect(renderedComponent.type).toBe('div');
    });

    it('should render a div for the ceremony', () => {
        expect(renderedCeremonyDiv.type).toBe('div');
        expect(renderedCeremonyDiv.props.className).toBe('row spaceBetween');
    });

    it('should render a div for the ceremony text', () => {
        expect(renderedCeremonyTextDiv.type).toBe('div');
        expect(renderedCeremonyTextDiv.props.className).toBe('HomeInfo-informationTextWrapper column');
    });

    it('should render ceremony header text', () => {
        expect(renderedCeremonyHeaderText.type).toBe('p');
        expect(renderedCeremonyHeaderText.props.className).toBe('HomeInfo-headerText');
        expect(renderedCeremonyHeaderText.props.children).toBe('THE CEREMONY');
    });

    it('should render the church name text', () => {
        expect(renderedChurchNameText.type).toBe('p');
        expect(renderedChurchNameText.props.className).toBe('HomeInfo-locationText');
        expect(renderedChurchNameText.props.children).toBe('Holy Rosary Church');
    });

    it('should render the ceremony date text', () => {
        expect(renderedCeremonyDateText.type).toBe('p');
        expect(renderedCeremonyDateText.props.children).toBe('May 28th, 2019 at 2PM');
    });

    it('should render the link for the church address', () => {
        expect(renderedChurchAddressLink.type).toBe('a');
        expect(renderedChurchAddressLink.props.href).toBe(holyRosaryLink);
        expect(renderedChurchAddressLink.props.target).toBe('_blank');
    });

    it('should render the text for the church address', () => {
        expect(renderedChurchAddressText.type).toBe('p');
        expect(renderedChurchAddressText.props.children).toBe('375 NE Clackamas St. Portland, OR 97232');
    });

    it('should render a div for the ceremony logo', () => {
        expect(renderedCeremonyLogoDiv.type).toBe('div');
        expect(renderedCeremonyLogoDiv.props.className).toBe('HomeInfo-logoWrapper row');
    });

    it('should render the ceremony logo', () => {
        expect(renderedCeremonyLogo.type).toBe('img');
        expect(renderedCeremonyLogo.props.alt).toBe('');
        expect(renderedCeremonyLogo.props.className).toBe('HomeInfo-logo');
        expect(renderedCeremonyLogo.props.src).toBe(require('../../src/assets/graphics/church.png'));
    });

    it('should render the top right span', () => {
        expect(renderedTopRightSpan.type).toBe('span');
        expect(renderedTopRightSpan.props.className).toBe('HomeInfo-topRightBorder');
    });

    it('should render a div for the reception', () => {
        expect(renderedReceptionDiv.type).toBe('div');
        expect(renderedReceptionDiv.props.className).toBe('row spaceBetween');
    });

    it('should render a div for the reception logo', () => {
        expect(renderedReceptionLogoDiv.type).toBe('div');
        expect(renderedReceptionLogoDiv.props.className).toBe('HomeInfo-logoWrapper row');
    });

    it('should render the reception logo', () => {
        expect(renderedReceptionLogo.type).toBe('img');
        expect(renderedReceptionLogo.props.alt).toBe('');
        expect(renderedReceptionLogo.props.className).toBe('HomeInfo-logo');
        expect(renderedReceptionLogo.props.src).toBe(require('../../src/assets/graphics/cake.png'));
    });

    it('should render a div for the reception text', () => {
        expect(renderedReceptionTextDiv.type).toBe('div');
        expect(renderedReceptionTextDiv.props.className).toBe('HomeInfo-informationTextWrapper column right');
    });

    it('should render reception header text', () => {
        expect(renderedReceptionHeaderText.type).toBe('p');
        expect(renderedReceptionHeaderText.props.className).toBe('HomeInfo-headerText');
        expect(renderedReceptionHeaderText.props.children).toBe('THE RECEPTION');
    });

    it('should render the church name text', () => {
        expect(renderedMcMenaminsNameText.type).toBe('p');
        expect(renderedMcMenaminsNameText.props.className).toBe('HomeInfo-locationText');
        expect(renderedMcMenaminsNameText.props.children).toBe('McMenamin\'S Cornelius Pass');
    });

    it('should render the reception date text', () => {
        expect(renderedReceptionDateText.type).toBe('p');
        expect(renderedReceptionDateText.props.children).toBe('May 28th, 2019 at 3:30PM');
    });

    it('should render the link for the church address', () => {
        expect(renderedMcMenaminsAddressLink.type).toBe('a');
        expect(renderedMcMenaminsAddressLink.props.href).toBe(mcmenaminsLink);
        expect(renderedMcMenaminsAddressLink.props.target).toBe('_blank');
    });

    it('should render the text for the church address', () => {
        expect(renderedMcMenaminsAddressText.type).toBe('p');
        expect(renderedMcMenaminsAddressText.props.children).toBe('4045 NE Cornelius Pass Rd. Hillsboro, OR 97124');
    });

    it('should render the bottom right border', () => {
        expect(renderedBottomRightSpan.type).toBe('span');
        expect(renderedBottomRightSpan.props.className).toBe('HomeInfo-bottomRightBorder');
    });

    it('should render the left span border', () => {
        expect(renderedLeftSpan.type).toBe('span');
        expect(renderedLeftSpan.props.className).toBe('HomeInfo-leftBorder');
    });
});