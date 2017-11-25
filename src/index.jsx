import ReactDOM from 'react-dom';
import React from 'react';
import colorutil from 'color-util';
import ColorPicker from './ColorPicker.jsx';

import './styles/samples.styl';
import './styles/common.styl';

class Components extends React.Component {

    constructor(props) {

        super(props);

        this.onColorChange.bind(this);
    }

    onColorChange(color) {

        document.body.style.backgroundColor = color.hex;
    }

    render() {

        return <div>
            <ColorPicker
                onChange={this.onColorChange}
                color={0x47679b}
                className='' />
        </div>
    }
}

let div = document.createElement('div');

document.body.appendChild(div)

ReactDOM.render(<Components/>, div);