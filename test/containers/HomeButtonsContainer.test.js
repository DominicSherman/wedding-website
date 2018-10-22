import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ActionCreators from '../../src/actions';

jest.mock('redux');
jest.mock('../../src/actions');
jest.mock('../../src/containers/MainContainer');
jest.mock('../../src/containers/PicturesContainer');

describe('MainContainer', () => {
    const getMapDispatchToProps = () => connect.mock.calls[0][1];

    beforeAll(() => {
        require('../../src/containers/HomeButtonsContainer');
    });

    it('should call connect', () => {
        expect(connect).toHaveBeenCalledTimes(1);
    });

    it('should mapDispatchToProps', () => {
        const dispatchSpy = jest.fn();
        const actualProps = getMapDispatchToProps()(dispatchSpy);

        expect(actualProps).toEqual({actions: bindActionCreators(ActionCreators)});
    });
});