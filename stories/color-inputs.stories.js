import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, text} from '@storybook/addon-knobs/react';
import ColorInputs from 'ColorInputs';

const onChangeAction = action('onChange');
onChangeAction.toString = () => '(color)=>{}';

const stories = storiesOf('ColorInputs', module);

stories.addDecorator(withKnobs);

stories
    .addWithJSX('Default', () => (
        <ColorInputs />
    ))
    // https://www.npmjs.com/package/color-util#color-format-conversion
    .addWithJSX('tester', () => (
        <ColorInputs 
            types={array('inputs', ['hex', 'cssrgb'], ',')} 
            color={text('color', '#00ff00')}
            onChange={onChangeAction} />
    ))


