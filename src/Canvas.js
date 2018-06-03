
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Canvas extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            value: {x: 0, y: 0},
            x: 0,
            y: 0,
            dragging: false,
            bounds: null
        };

        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    componentDidMount() {

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);

        let rootNode = ReactDOM.findDOMNode(this);
        let bounds = rootNode.getBoundingClientRect();
        let value = this.limitValue(this.props.value);
        let point = this.valueToPoint(value, bounds);
        point = this.limitPoint(point, bounds);

        this.setState({...point, value, bounds});
    }

    componentWillUnmount() {

        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    onMouseUp() {

        this.setState({dragging: false});
    }

    onMouseDown(event) {

        let point = this.calculatePointerPosition(event);
        let value = this.pointToValue(point);

        this.setState({...point, value, dragging: true});
        this.props.onChange(value);
    }

    onMouseMove(event) {

        if (this.state.dragging) {

            let point = this.calculatePointerPosition(event);
            let value = this.pointToValue(point);

            this.setState({...point, value});
            this.props.onChange(value);
        }
    }

    calculatePointerPosition(event) {

        let {top, left} = this.state.bounds;
        let x = event.clientX - left;
        let y = event.clientY - top;
        
        return this.limitPoint({x, y});
    }

    limitPoint(point, bounds=this.state.bounds) {

        if (this.props.limitPoint) {
            // allow overriding this method from hoc
            return this.props.limitPoint(point, bounds);
        }

        let {x, y} = point;
        let {width, height} = bounds;

        return {
            x: x < 0 ? 0 : x > width ? width : x,
            y: y < 0 ? 0 : y > height ? height : y
        };
    }

    limitValue(value) {

        if (this.props.limitValue) {
            // allow overriding this method from hoc
            return this.props.limitValue(value);
        }

        let {x, y} = value;
        let {x: minx, y: miny} = this.props.min;
        let {x: maxx, y: maxy} = this.props.max;

        return {
            x: x < minx ? minx : x > maxx ? maxx : x,
            y: y < miny ? miny : y > maxy ? maxy : y
        };
    }

    pointToValue(point) {

        let {x, y} = point;
        let {x: minx, y: miny} = this.props.min;
        let {x: maxx, y: maxy} = this.props.max;
        let {width, height} = this.state.bounds;

        return {
            x: minx + (x / width) * (maxx - minx),
            y: miny + (y / height) * (maxy - miny)
        }
    }

    valueToPoint(value, bounds=this.state.bounds) {

        let {x: minx, y: miny} = this.props.min;
        let {x: maxx, y: maxy} = this.props.max;

        return {
            x: ((value.x - minx) / (maxx - minx)) * bounds.width,
            y: ((value.y - miny) / (maxy - miny)) * bounds.height
        }
    }

    render() {

        let dragging = this.state.dragging ? ' dragging' : '';

        return <div className={`canvas ${this.props.orientation}`}>
            
            {
                this.state.bounds && 

                <div 
                    className='track'
                    onMouseDown={this.onMouseDown} 
                    style={this.props.style}>

                    <div
                        className={`selection-container${dragging}`}
                        style={{
                            left: this.state.x,
                            top: this.state.y
                        }}>

                        <div 
                            className='selection'
                            style={this.props.thumbStyle} />

                    </div>

                </div>
            }

        </div>
    }
}

Canvas.propTypes = {
    value: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    min: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    max: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    style: PropTypes.object,
    thumbStyle: PropTypes.object,
    onChange: PropTypes.func,
    limitPoint: PropTypes.func,
    limitValue: PropTypes.func
}

Canvas.defaultProps = {
    value: {x: 0, y: 0},
    min: {x: 0, y: 0},
    max: {x: 1, y: 1},
    style: {},
    thumbStyle: {},
    onChange: ()=>{},
    limitPoint: null,
    limitValue: null
}

export default Canvas;