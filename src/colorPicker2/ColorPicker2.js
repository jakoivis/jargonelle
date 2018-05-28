
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import HsvPicker from 'colorPicker2/HsvPicker';

import 'styles/ColorPicker2';

export default class ColorPicker2 extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
        }
    }

    render() {

        return <div className='color-picker2'>

            <HsvPicker hue={'#00FF00'} boundsClassName='hsv-picker-wrapper' />

        </div>
    }
}

ColorPicker2.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func
}

ColorPicker2.defaultProps = {
    color: 0xFF0000,
    onChange: _.noop
}