
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import Gradient from 'colorPicker/Gradient';
import ColorPicker from 'colorPicker/ColorPicker';
import SnapDragGrid from 'SnapDragGrid';

import 'styles/GradientGrid';

export default class GradientGrid extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            data: this.createGradientData(this.props.colors)
        };

        this.onGridChange = this.onGridChange.bind(this);
        this.createNewPointData = this.createNewPointData.bind(this);
    }

    createGradient(data) {

        return colorutil[this.props.colorType].gradient({
            colors: data,
            type: this.props.type,
            defaultColor: this.props.defaultColor,
            width: this.props.width,
            height: this.props.height,
            centerX: this.props.centerX,
            centerY: this.props.centerY,
            scale: this.props.scale,
            scaleX: this.props.scaleX,
            scaleY: this.props.scaleY,
            translateX: this.props.translateX,
            translateY: this.props.translateY,
            centralize: this.props.centralize,
            rotation: this.props.rotation,
            repeatX: this.props.repeatX,
            repeatY: this.props.repeatY
        });
    }

    createGradientData(data) {

        return colorutil[this.props.colorType].gradientData(data);
    }

    onGridChange(data) {

        this.setState(() => {
            return {
                data: this.createGradientData(data)
            };
        });
    }

    createNewPointData(x, y) {

        let gradient = this.createGradient(this.state.data);

        let color = gradient(x, y);

        return color;
    }

    render() {

        return <div 
            className='gradient-grid'
            style={{
                width: this.props.width,
                height: this.props.height
            }}>

            <div className='container'>

                <Gradient {...this.props} colors={this.state.data} />

                <SnapDragGrid
                    width={this.props.width}
                    height={this.props.height}
                    data={this.state.data.flat2d}
                    onChange={this.onGridChange}
                    createNewPointData={this.createNewPointData}
                    pointComponent={Thumb}/>

            </div>
        </div>
    }
}

function Thumb(props) {

    return <div
        className='selection-container'
        onClick={props.onClick}>

        <div
            className='selection'
            style={{
                backgroundColor: colorutil.rgb.to.hex(props)
            }}
        />

    </div>
}

GradientGrid.propTypes = {
    colorType: PropTypes.oneOf(['rgb', 'hsv', 'hsl']),
    // lockYAxis: PropTypes.bool,
    // lockXAxis: PropTypes.bool,
    // onChange: PropTypes.func,
    // onMouseDown: PropTypes.func,
    // onMouseUp: PropTypes.func,

    colors: PropTypes.array,
    type: PropTypes.string,
    defaultColor: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    centerX: PropTypes.number,
    centerY: PropTypes.number,
    scale: PropTypes.number,
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    centralize: PropTypes.bool,
    rotation: PropTypes.number,
    repeatX: PropTypes.func,
    repeatY: PropTypes.func
}


GradientGrid.defaultProps = {
    colorType: 'rgb',
    // lockXAxis: false,
    // lockYAxis: false,
    // onChange: _.noop,
    // onMouseDown: _.noop,
    // onMouseUp: _.noop,

    colors: [
        colorutil.rgb.hueColors(),
        [{r: 0, g: 0, b: 0, a: 0}]
    ],
    type: 'linear',
    defaultColor: null,
    width: 100,
    height: 100,
    centerX: 0,
    centerY: 0,
    scale: 1,
    scaleX: null,
    scaleY: null,
    translateX: 0,
    translateY: 0,
    centralize: false,
    rotation: 0,
    repeatX: colorutil.repeat.repeat,
    repeatY: colorutil.repeat.repeat
}