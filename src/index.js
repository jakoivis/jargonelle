import ReactDOM from 'react-dom';
import React from 'react';
import ColorPicker from 'colorPicker/ColorPicker';
import GradientGrid from 'GradientGrid';
import SnapDragGrid from 'SnapDragGrid';
import GradientPickerGrid from 'colorPicker/GradientPickerGrid';
import ColorPicker2 from 'colorPicker2/ColorPicker2';

import 'styles/samples';
import 'styles/common';
import 'styles/GradientGrid';
import 'styles/ColorPicker2';

class Components extends React.Component {

    constructor(props) {

        super(props);

        this.onColorChange.bind(this);
    }

    onColorChange(color) {

        // document.body.style.backgroundColor = color.hex;
    }

    render() {

        return <div className="samples">

            <ColorPicker2 />

        </div>
    }
}

let div = document.createElement('div');

document.body.appendChild(div)

ReactDOM.render(<Components/>, div);

/*
            <GradientGrid
                width={150}
                height={150}
                colors={
                    [[{r:255}, {g:255}],[{b:255}, {r:255, g: 255}]]
                }/>

            <SnapDragGrid
                width={150}
                height={150}
                data={[
                    {x:0, y:0}, {x:1, y:0},
                    {x:0.5, y:0.5},
                    {x:0, y:1}, {x:1, y:1}]}
                />

            <ColorPicker
                onChange={this.onColorChange}
                color={0xff0055} />

*/