import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, boolean} from '@storybook/addon-knobs/react';
import ColorPicker from 'ColorPicker';

const stories = storiesOf('ColorPicker', module);

stories.addDecorator(withKnobs);

stories
    .addWithJSX('Default', () => (
        <ColorPicker />
    ))
    // https://www.npmjs.com/package/color-util#color-format-conversion
    .addWithJSX('tester', () => (
        <ColorPicker 
            alpha={boolean('alpha', true)} 
            inputs={array('inputs', ['hex', 'cssrgb'], ',')} 
            color='#00ff00'
            style={{height: '230px'}} />
    ))


