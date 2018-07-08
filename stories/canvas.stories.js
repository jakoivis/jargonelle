import React from 'react';
import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
import { withKnobs, array, boolean, text, object } from '@storybook/addon-knobs/react';
import Canvas from 'Canvas';

const stories = storiesOf('Canvas', module);

stories.addDecorator(withKnobs);

const onDragChangeAction = action('onDragChange');
const onChangeAction = decorateAction([
  args => [JSON.stringify(args[0])]
]);

onChangeAction.toString = () => '({x,y})=>{}';
onDragChangeAction.toString = () => '(dragging)=>{}';

stories
    .addWithJSX('Default', () => (
        // by default Canvas has not dimensions specified.
        // dimensions can be set by adding css styles to 
        // the root element or by using style prop.
        // here styles are specified just to see something
        <Canvas 
            style={{
                width: '300px',
                height: '150px'
            }} 
            trackStyle={{
                backgroundColor: '#444'
            }}/>
    ))
    .addWithJSX('tester', () => (
        <Canvas 
            className={text('className', 'class-name')}
            value={object('value', {x: 0.5, y: 0.5})} 
            min={object('min', {x: -0.1, y: -0.1})} 
            max={object('max', {x: 0.9, y: 0.9})} 
            style={{
                width: '300px',
                height: '150px'
            }}
            trackStyle={{
                backgroundColor: '#444'
            }}
            onChange={onChangeAction}
            onDragChange={onDragChangeAction}
            />
    ))


