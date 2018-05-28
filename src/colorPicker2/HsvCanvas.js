
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import Bounds from 'hocs/Bounds';

class HsvCanvas extends React.Component {

    constructor(props) {

        super(props);

        let color = colorutil.color(this.props.color);

        this.state = {
            ...this.colorToXY(color),
            hue: color.hue().hex,
            dragging: false
        };

        // this.onChange = this.onChange.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    componentDidMount() {

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {

        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    // componentWillReceiveProps(nextProps) {

    //     if (nextProps.x !== this.props.x) {

    //         this.setState({
    //             x: nextProps.x,
    //         });
    //     }

    //     if (nextProps.y !== this.props.y) {

    //         this.setState({
    //             y: nextProps.y
    //         });
    //     }
    // }

    onMouseUp() {

        this.setState({
            dragging: false
        });
    }

    onMouseDown(event) {

        let point = this.calculatePointerPosition(event);
        let color = this.xyToColor(point);

        this.setState({
            ...point,
            color,
            dragging: true
        });

        this.props.onChange(color);
    }

    onMouseMove(event) {

        if (this.state.dragging) {

            let point = this.calculatePointerPosition(event);
            let color = this.xyToColor(point);

            this.setState({...point, color});
            this.props.onChange(color);
        }
    }

    calculatePointerPosition(event) {

        let bounds = this.props.bounds;
        let x = event.clientX - bounds.left;
        let y = event.clientY - bounds.top;
        let w = bounds.width;
        let h = bounds.height;

        y = y < 0 ? 0 : y > h ? h : y;
        x = x < 0 ? 0 : x > w ? w : x;

        return {x, y};
    }

    xyToColor(point) {

        let bounds = this.props.bounds;
        let normalizedX = point.x / bounds.width;
        let normalizedY = 1 - (point.y / bounds.height);

        return colorutil.color({h: 0, s: normalizedX, v: normalizedY})
            .hueFromColor(this.state.hue);
    }

    colorToXY(color) {

        let bounds = this.props.bounds;

        return {
            x: color.hsv.s * bounds.width,
            y: (1 - color.hsv.v) * bounds.height
        };
    }

    render() {

        let draggerClassName = 'selection-container' + 
            (this.state.dragging ? ' dragging' : '');

        return <React.Fragment>

            <div className='gradient' onMouseDown={this.onMouseDown}>

                <div className='hue' style={{backgroundColor: this.state.hue}} />
                <div className='saturation-value' />

            </div>

            <div
                className={draggerClassName}
                style={{
                    left: this.state.x,
                    top: this.state.y
                }}>

                <div className='selection' />

            </div>

        </React.Fragment>
    }
}

HsvCanvas.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func
}

HsvCanvas.defaultProps = {
    color: '#ff0000',
    onChange: _.noop
}

export default Bounds(HsvCanvas, {
    className: 'hsv-canvas'
});