import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ColorUtil from 'color-util';
import getClassName from './util/getClassName.js';

import './styles/color-matrix.styl';

export default class ColorMatrix extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            matrixX: this.props.x,
            matrixY: this.props.y
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

    componentDidUpdate() {
        this.updateCanvas();
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

        let matrixX = x / w;
        let matrixY = y / h;
        let rgb = ColorUtil.getMatrixColor(this.props.colors, matrixX, matrixY);

        this.setState({
            matrixX: matrixX,
            matrixY: matrixY
        });

        this.props.onChange(rgb, matrixX, matrixY);
    }

    updateCanvas() {
        let width = this.props.width;
        let height = this.props.height;
        let colors = this.props.colors;
        let ctx = this.canvas.getContext('2d');
        let imageData = ctx.createImageData(width, height);
        let buffer = imageData.data.buffer;
        let uint32View = new Uint32Array(buffer);
        let uint8CView = new Uint8ClampedArray(buffer);

        let rgb;

        for(let x = 0; x < width; x++) {

            for(let y = 0; y < height; y++) {

                rgb = ColorUtil.getMatrixColor(colors, x/width, y/height);

                uint32View[y * width + x] = ColorUtil.rgb.toUint32(rgb);
            }
        }

        imageData.data.set(uint8CView);

        ctx.putImageData(imageData, 0, 0);
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
                    left: this.state.matrixX * this.props.width,
                    top: this.state.matrixY * this.props.height
                }} >

                {this.props.children}

            </div>

        </div>;
    }
}

ColorMatrix.propTypes = {
    colors: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
    lockYAxis: PropTypes.bool,
    lockXAxis: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
}

ColorMatrix.defaultProps = {
    colors: ColorUtil.convert(
        [
            [0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF, 0xFF0000],
            [0x000000]
        ],
        ColorUtil.int.toRgb
    ),
    width: 100,
    height: 100,
    onChange: _.noop,
    lockXAxis: false,
    lockYAxis: false,
    x: 0.5,
    y: 0.5
}