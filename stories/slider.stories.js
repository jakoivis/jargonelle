import React from 'react';
import { storiesOf } from '@storybook/react';
import { action, decorate } from '@storybook/addon-actions';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs/react';
import Slider from 'Slider';

const onChangeAction = decorate([
        // just make the action output readable (object -> string)
        args => [JSON.stringify(args[0]).replace(/"/g, '')]
    ])
    .action('onChangeAction');

storiesOf('Slider', module)
    .addDecorator(withKnobs)
    .add('Slider', () => (
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
            onDragChange={action('onDragChange')}
            expanding={boolean('expanding', true)}
            />
    ));
