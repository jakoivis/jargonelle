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

        document.body.addEventListener('mousemove', this.onMouseMove);
        document.body.addEventListener('mouseup', this.onMouseUp);

        let color = this.getColor(
                this.state.matrixX,
                this.state.matrixY,
                this.props.colors);

        this.props.onValueChange(color);
    }

    componentWillUnmount() {
        document.body.removeEventListener('mousemove', this.onMouseMove)
        document.body.removeEventListener('mouseup', this.onMouseUp)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.colors !== nextProps.colors) {
            let color = this.getColor(
                this.state.matrixX,
                this.state.matrixY,
                nextProps.colors);

            this.props.onValueChange(color);

            this.setState({
                color: color
            })
        }
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    onMouseDown(event) {
        this.mouseDown = true;

        this.updateSelectionPosition(event);
    }

    onMouseUp(event) {
        this.mouseDown = false;
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
        let color = this.getColor(matrixX, matrixY, this.props.colors);

        this.setState({
            matrixX: matrixX,
            matrixY: matrixY
        });

        this.props.onChange(color);
        this.props.onValueChange(color);
    }

    getColor(matrixX, matrixY, colors) {
        return ColorUtil.getGradientMatrixColor(
            colors,
            matrixX, matrixY,
            ColorUtil.int.toRgb,
            ColorUtil.rgb.toInt);
    }

    updateCanvas() {
        let width = this.props.width;
        let height = this.props.height;
        let colors = ColorUtil.convert(this.props.colors, ColorUtil.int.toRgb);
        let ctx = this.canvas.getContext('2d');
        let imageData = ctx.createImageData(width, height);
        let buffer = imageData.data.buffer;
        let uint32View = new Uint32Array(buffer);
        let uint8CView = new Uint8ClampedArray(buffer);

        for(let x = 0; x < width; x++) {

            for(let y = 0; y < height; y++) {

                uint32View[y * width + x] =
                    ColorUtil.getGradientMatrixColor(
                        colors,
                        x/width,
                        y/height,
                        null,
                        ColorUtil.rgb.toUint32);
            }
        }

        imageData.data.set(uint8CView);

        ctx.putImageData(imageData, 0, 0);
    }

    render() {
        return <div
            className={getClassName(this.props, 'color-matrix')}>

            <div
                className="color"
                onMouseDown={this.onMouseDown}
                style={{
                    width: this.props.width,
                    height: this.props.height
                }}>

                <canvas
                    ref={canvas => {this.canvas = canvas}}
                    width={this.props.width}
                    height={this.props.height} />
            </div>

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
    onValueChange: PropTypes.func,
    lockYAxis: PropTypes.bool,
    lockXAxis: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
}

ColorMatrix.defaultProps = {
    colors: [[0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF, 0xFF0000], [0x000000]],
    width: 100,
    height: 100,
    onChange: _.noop,
    onValueChange: _.noop,
    lockXAxis: false,
    lockYAxis: false,
    x: 0.5,
    y: 0.5
}