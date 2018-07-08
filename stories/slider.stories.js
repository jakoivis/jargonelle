import React from 'react';
import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
import { withKnobs, array, boolean, text, number } from '@storybook/addon-knobs/react';
import Slider from 'Slider';

const stories = storiesOf('Slider', module);

stories.addDecorator(withKnobs);

const onDragChangeAction = action('onDragChange');
const onChangeAction = decorateAction([
  args => [JSON.stringify(args[0])]
]);

onChangeAction.toString = () => '(value)=>{}';
onDragChangeAction.toString = () => '(dragging)=>{}';

stories
    .addWithJSX('Default', () => (
        // by default Canvas has not dimensions specified.
        // dimensions can be set by adding css styles to 
        // the root element or by using style prop.
        // here styles are specified just to see something
        <Slider 
            style={{
                width: '300px',
                height: '15px'
            }} 
            trackStyle={{
                backgroundColor: '#444'
            }}/>
    ))
    .addWithJSX('tester', () => (
        <Slider 
            className={text('className', 'class-name')}
            value={number('value', 0.5)} 
            min={number('min', -0.1)} 
            max={number('max', 0.9)} 
            style={{
                width: '300px',
                height: '15px'
            }}
            trackStyle={{
                backgroundColor: '#444'
            }}
            onChange={onChangeAction}
            onDragChange={onDragChangeAction}
            expanding={boolean('expanding', true)}
            />
    ))