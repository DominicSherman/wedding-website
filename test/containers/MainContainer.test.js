import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Main from '../../src/Main';

jest.mock('react-redux');
jest.mock('redux');

describe('MainContainer', () => {
    let mapStateToPropsSpy,
        mapDispatchToPropsSpy;

    require('../../src/containers/MainContainer');

    beforeEach(() => {
        console.log('connect', connect);
        mapStateToPropsSpy = connect.mock.calls[0][0];
        mapDispatchToPropsSpy = connect.mock.calls[0][1];
    });

    it('should call connect', () => {
        expect(connect).toHaveBeenCalledTimes(1);
        expect(connect).toHaveBeenCalledWith(Main);
    });
});