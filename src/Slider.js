
import React from 'react';
import PropTypes from 'prop-types';

import Canvas from 'Canvas';

class Slider extends React.Component {

    constructor(props) {

        super(props);

        let {min, max, value, orientation} = this.props;
        let newMin, newMax, newValue;

        if (orientation === 'horizontal') {
            newMin = {x: min, y: 0};
            newMax = {x: max, y: 1};
            newValue = {x: value, y: 0};
        
        } else {
            newMin = {x: 0, y: min};
            newMax = {x: 1, y: max};
            newValue = {x: 0, y: value};
        }

        this.state = {
            min: newMin,
            max: newMax,
            value: newValue
        };
    }

    render() {

        let {min, max, value} = this.state;
        let {style, thumbStyle} = this.props;

        return <Canvas
            className={`slider ${this.props.className} ${this.props.orientation}`}
            min={min}
            max={max}
            value={value}
            style={style}
            thumbStyle={thumbStyle}
            thumb={this.props.thumb}
            onChange={(value) => {

                value = this.props.orientation === 'horizontal' ? value.x : value.y;

                this.props.onChange(value);
            }}
            limitPoint={(point, bounds) => {

                let {x, y} = point;
                let {width, height} = bounds;
                let {orientation} = this.props;

                if (orientation === 'horizontal') {

                    return {
                        x: x < 0 ? 0 : x > width ? width : x,
                        y: height / 2
                    };
                }

                return {
                    y: y < 0 ? 0 : y > height ? height : y,
                    x: width / 2
                };
            }}
            limitValue={(value) => {

                let {x, y} = value;
                let {x: minx, y: miny} = this.state.min;
                let {x: maxx, y: maxy} = this.state.max;
                let {orientation} = this.props;

                if (orientation === 'horizontal') {

                    return {
                        x: x < minx ? minx : x > maxx ? maxx : x,
                        y: y
                    }
                }

                return {
                    y: y < miny ? miny : y > maxy ? maxy : y,
                    x: x
                };
            }} />
    }
}

Slider.propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    style: PropTypes.object,
    thumbStyle: PropTypes.object,
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    onChange: PropTypes.func
}

Slider.defaultProps = {
    className: '',
    value: 0,
    min: 0,
    max: 1,
    style: {},
    thumbStyle: {},
    orientation: 'horizontal',
    onChange: ()=>{}
}

export default Slider;
