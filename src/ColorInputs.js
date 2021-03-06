
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

export default class ColorInputs extends React.Component {

    constructor(props) {

        super(props);

        const color = colorutil.color(this.props.color);
        const inputValues = this.getInputValuesFromColor(color);

        this.state = {
            color,
            inputValues
        };
    }

    componentWillReceiveProps(nextProps) {

        const {color, types} = this.props;

        if (nextProps.color !== color ||
            nextProps.types !== types) {

            const color = colorutil.color(nextProps.color);
            const inputValues = this.getInputValuesFromColor(color, nextProps.types);

            this.setState({color, inputValues});
        }
    }

    getInputValuesFromColor(color, types=this.props.types) {

        return types.reduce((acc, type) => {
            
            type = type.trim();

            if (colorutil[type]) {

                acc.push({
                    type: type,
                    value: color[type]
                });
            }

            return acc;
        }, []);
    }

    onInputChange = event => {

        const {name, value} = event.target;
        let inputValues = this.state.inputValues;
        const inputObject = _.find(inputValues, ['type', name]);
        const isValid = colorutil[name].test(value);

        // TODO: clone before assign
        inputObject.value = value;

        this.setState({inputValues});

        if (isValid) {

            const color = colorutil.color(value);

            inputValues = this.getInputValuesFromColor(color);

            this.setState({color, inputValues});
            this.props.onChange(color);
        }
    }

    renderInputs() {

        return _.map(this.state.inputValues, (inputObject) => {

            return (
                <input
                    key={inputObject.type}
                    name={inputObject.type}
                    type='text'
                    value={inputObject.value}
                    onChange={this.onInputChange} />
            );
        });
    }

    render() {

        return <div className='inputs'>
            {this.renderInputs()}
        </div>;
    }
}

ColorInputs.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func,
    types: PropTypes.array
}

ColorInputs.defaultProps = {
    color: null,
    onChange: (color)=>{},
    types: ['hex']
}