import React, {Component} from 'react';

export default class BrideGroom extends Component {
    render() {
        const {image, header, story} = this.props;

        return (
            <div>
                <div className={'row center'}>
                    <img
                        alt={''}
                        className={'OurStory-images'}
                        src={image}
                    />
                </div>
                <div className={'row center'}>
                    <p className={'OurStory-headerText'}>{header}</p>
                </div>
                <div className={'row center'}>
                    <div className={'OurStory-bodyText'}>{story}</div>
                </div>
            </div>
        );
    }
}