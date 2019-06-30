import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import { action, decorate } from '@storybook/addon-actions';
import { withKnobs, array, boolean, text, object  } from '@storybook/addon-knobs/react';

import Canvas from 'Canvas';

const onChangeAction = decorate([
        // just make the action output readable (object -> string)
        args => [JSON.stringify(args[0]).replace(/"/g, '')]
    ])
    .action('onChangeAction');

storiesOf('Canvas', module)
    .addDecorator(withKnobs)
    .add('Canvas', () => (
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
            onDragChange={action('onDragChange')}
            />
    ));