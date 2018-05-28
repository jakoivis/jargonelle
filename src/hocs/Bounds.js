
import React from 'react';
import ReactDOM from 'react-dom';

export default (Component, {className='bounds'}={}) => 
    class Bounds extends React.Component {

    constructor(props) {

        super(props);

        this.state = {};
    }

    componentDidMount() {

        let rootNode = ReactDOM.findDOMNode(this.component);
        let bounds = rootNode.getBoundingClientRect();

        this.setState({bounds});
    }

    render() {

        return <div 
            ref={(component) => {this.component = component; }}
            className={className}>

            {
                this.state.bounds && 
                
                <Component
                    {...this.props}
                    {...this.state}
                />
            }

        </div>
    }
}