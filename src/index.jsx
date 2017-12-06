import ReactDOM from 'react-dom';
import React from 'react';
import ColorPicker from './colorPicker/ColorPicker.jsx';
import GradientGrid from './GradientGrid.jsx';
import SnapDragGrid from './SnapDragGrid.jsx';
import GradientPickerGrid from './colorPicker/GradientPickerGrid.jsx';

import './styles/samples.styl';
import './styles/common.styl';
import './styles/GradientGrid.styl';

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

            <SnapDragGrid
                width={300}
                height={300}
                data={[{x:0, y:0}, {x:0.5, y:0.5}]}
                />

            <ColorPicker
                onChange={this.onColorChange}
                color={0xff0000} />

        </div>
    }
}

let div = document.createElement('div');

document.body.appendChild(div)

ReactDOM.render(<Components/>, div);