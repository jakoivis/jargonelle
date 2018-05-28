
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import ColorInputs from 'colorPicker/ColorInputs';
import HueGrayscaleMatrix from 'colorPicker/HueGrayscaleMatrix';
import HueSliderPalette from 'colorPicker/HueSliderPalette';
import ColorPickerPanel from 'colorPicker/ColorPickerPanel';

import '../styles/colorPicker/ColorPicker';

export default class ColorPicker extends React.Component {

    constructor(props) {

        super(props);

        this.onSwatchClick = this.onSwatchClick.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);

        this.state = {
            color: colorutil.color(this.props.color),
            open: false
        }
    }

    onSwatchClick() {

        this.setState({
            open: !this.state.open
        });
    }

    onClickOutside() {

        this.setState({
            open: false
        });
    }

    onColorChange(color) {

        this.setState({
            color: color
        });

        this.props.onChange(color);
    }

    render() {

        return <div className='color-picker'>

            <ColorSwatch
                onClick={this.onSwatchClick}
                color={this.state.color}
                open={this.state.open} />

            {
                this.state.open &&

                <ColorPickerPanel
                    onClickOutside={this.onClickOutside}
                    onChange={this.onColorChange}
                    color={this.state.color} />
            }

        </div>
    }
}

function ColorSwatch(props) {

    let className = props.open ? ' open' : '';

    return <div
        className={'color-picker-swatch' + className}
        onClick={props.onClick}>

        <div style={{
            backgroundColor: props.color.hex
        }} />

    </div>
}

ColorPicker.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func
}

ColorPicker.defaultProps = {
    color: 0xFF0000,
    onChange: _.noop
}