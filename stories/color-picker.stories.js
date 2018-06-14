import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, boolean } from '@storybook/addon-knobs/react';

import ColorPicker from 'ColorPicker';

const stories = storiesOf('ColorPicker', module);

stories.addDecorator(withKnobs);

stories.add('Default', () => (
        <ColorPicker />
    ))
    .add('multiple input types', () => (
        // https://www.npmjs.com/package/color-util#color-format-conversion
        <ColorPicker inputs={['int', 'hex', 'rgb', 'cssrgb', 
            'cssrgba', 'hsl', 'csshsl', 'csshsla', 'hsv']} />
    ))
    .add('alpha slider', () => (
        <ColorPicker alpha={true} inputs={['cssrgba']} />
    ))
    .add('tester', () => (
        <ColorPicker 
            alpha={boolean('alpha', false)} 
            inputs={array('inputs', ['hex', 'cssrgb'], ',')} />
    ))


