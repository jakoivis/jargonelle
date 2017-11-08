import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ColorUtil from 'color-util';
import getClassName from '../util/getClassName.js';

import '../styles/color-matrix.styl';

export default class ColorMatrix extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            x: this.props.x,
            y: this.props.y
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    componentDidMount() {
        this.updateCanvas();

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    onMouseDown(event) {
        this.mouseDown = true;

        this.setState({
            css: {
                dragging: true
            }
        });

        this.updateSelectionPosition(event);
    }

    onMouseUp(event) {
        this.mouseDown = false;

        this.setState({
            css: {
                dragging: false
            }
        });
    }

    onMouseMove(event) {
        if (this.mouseDown) {
            this.updateSelectionPosition(event);
        }
    }

    updateSelectionPosition(event) {
        var pos = this.calculatePointerPosition(event);
        let gradient = this.createGradient();
        let rgb = gradient(pos.x, pos.y);

        this.setState(pos);
        this.props.onChange(rgb, pos.x, pos.y);
    }

    calculatePointerPosition(event) {
        let bounds = this.canvas.getBoundingClientRect();
        let x = event.clientX - bounds.left;
        let y = event.clientY - bounds.top;
        let w = this.props.width;
        let h = this.props.height;

        if (this.props.lockYAxis) {
            y = h / 2;

        } else {
            y = y < 0 ? 0 : y > h ? h : y;
        }

        if (this.props.lockXAxis) {
            x = w / 2;

        } else {
            x = x < 0 ? 0 : x > w ? w : x;
        }

        return {
            x: x,
            y: y
        };
    }

    updateCanvas() {
        let w = this.props.width;
        let h = this.props.height;
        let ctx = this.canvas.getContext('2d');
        let imageData = ctx.createImageData(w, h);
        let buffer = imageData.data.buffer;
        let uint32View = new Uint32Array(buffer);
        let uint8CView = new Uint8ClampedArray(buffer);
        let gradient = this.createGradient();
        let rgb;

        for(let x = 0; x < w; x++) {

            for(let y = 0; y < h; y++) {

                rgb = gradient(x, y);

                uint32View[y * w + x] = ColorUtil.rgb.toUint32(rgb);
            }
        }

        imageData.data.set(uint8CView);

        ctx.putImageData(imageData, 0, 0);
    }

    createGradient() {
        return ColorUtil.rgb.createGradient({
            colors: this.props.colors,
            rotation: this.props.rotation,
            width: this.props.width,
            height: this.props.height,
            centerX: 0.5,
            centerY: 0.5
        });
    }

    render() {

        return <div
            className={getClassName('color-matrix', this.props, this.state)}
            onMouseDown={this.onMouseDown}>

            <canvas
                className="color"
                ref={canvas => {this.canvas = canvas}}
                width={this.props.width}
                height={this.props.height} />

            <div
                className="selection-container"
                style={{
                    left: this.state.x,
                    top: this.state.y
                }}>

                {this.props.children}

            </div>

        </div>;
    }
}

ColorMatrix.propTypes = {
    colors: PropTypes.array,
    rotation: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
    lockYAxis: PropTypes.bool,
    lockXAxis: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
}

ColorMatrix.defaultProps = {
    colors: [
        ColorUtil.rgb.hueColors(),
        {r: 0, g: 0, b: 0, a: 0}
    ],
    rotation: 0,
    width: 100,
    height: 100,
    onChange: _.noop,
    lockXAxis: false,
    lockYAxis: false,
    x: 0,
    y: 0
}