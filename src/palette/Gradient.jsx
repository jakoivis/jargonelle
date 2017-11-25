
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';
import getClassName from '../util/getClassName.js';

import '../styles/color-matrix.styl';

export default class Gradient extends React.Component {

    constructor(props) {

        super(props);

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

        this.updateSelectionPosition(event);

        this.props.onMouseDown(event);
    }

    onMouseUp(event) {

        this.mouseDown = false;

        this.props.onMouseUp(event);
    }

    onMouseMove(event) {

        if (this.mouseDown) {

            this.updateSelectionPosition(event);
        }
    }

    updateSelectionPosition(event) {

        let {x, y} = this.calculatePointerPosition(event);
        let gradient = this.createGradient();
        let colorValue = gradient(x, y);
        let color = colorutil.color(colorValue);

        this.props.onChange(color, x, y);
    }

    calculatePointerPosition(event) {

        let bounds = this.canvas.getBoundingClientRect();
        let x = event.clientX - bounds.left;
        let y = event.clientY - bounds.top;
        let w = this.props.width;
        let h = this.props.height;

        if (this.props.lockYAxis) {
            y = 0;

        } else {
            y = y < 0 ? 0 : y > h ? h : y;
        }

        if (this.props.lockXAxis) {
            x = 0;

        } else {
            x = x < 0 ? 0 : x > w ? w : x;
        }

        return {
            x: x,
            y: y
        };
    }

    updateCanvas() {

        console.log('update canvas');

        let w = this.props.width;
        let h = this.props.height;
        let ctx = this.canvas.getContext('2d');
        let imageData = ctx.createImageData(w, h);
        let buffer = imageData.data.buffer;
        let uint32View = new Uint32Array(buffer);
        let uint8CView = new Uint8ClampedArray(buffer);
        let gradient = this.createGradient();
        let drawPixel = this.getDrawPixelFunction();

        for(let x = 0; x < w; x++) {

            for(let y = 0; y < h; y++) {

                drawPixel(x, y, w, gradient, uint32View);
            }
        }

        imageData.data.set(uint8CView);

        ctx.putImageData(imageData, 0, 0);
    }

    getDrawPixelFunction() {

        switch (this.props.colorType) {

            case 'rgb': return this.drawPixelRgb;
            case 'hsv': return this.drawPixelHsv;
            case 'hsl': return this.drawPixelHsl;
            default: return this.drawPixelRgb;
        }
    }

    drawPixelRgb(x, y, w, gradient, uint32View) {

        let rgb = gradient(x, y);

        uint32View[y * w + x] = colorutil.rgb.to.intabgr(rgb);
    }

    drawPixelHsv(x, y, w, gradient, uint32View) {

        let hsv = gradient(x, y);
        let rgb = colorutil.hsv.to.rgb(hsv);

        uint32View[y * w + x] = colorutil.rgb.to.intabgr(rgb);
    }

    drawPixelHsl(x, y, w, gradient, uint32View) {

        let hsl = gradient(x, y);
        let rgb = colorutil.hsl.to.rgb(hsl);

        uint32View[y * w + x] = colorutil.rgb.to.intabgr(rgb);
    }

    createGradient() {

        return colorutil[this.props.colorType].gradient({
            colors: this.props.colors,
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

    render() {

        return <canvas
            onMouseDown={this.onMouseDown}
            className="color"
            ref={canvas => {this.canvas = canvas}}
            width={this.props.width}
            height={this.props.height} />
    }
}

Gradient.propTypes = {
    colorType: PropTypes.oneOf(['rgb', 'hsv', 'hsl']),
    lockYAxis: PropTypes.bool,
    lockXAxis: PropTypes.bool,
    onChange: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,

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

Gradient.defaultProps = {
    colorType: 'rgb',
    lockXAxis: false,
    lockYAxis: false,
    onChange: _.noop,
    onMouseDown: _.noop,
    onMouseUp: _.noop,

    // null used to let colorutil determine default
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