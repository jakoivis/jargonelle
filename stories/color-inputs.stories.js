import React from 'react';
import { storiesOf } from '@storybook/react';
import { action, decorate } from '@storybook/addon-actions';
import { withKnobs, array, text} from '@storybook/addon-knobs/react';
import ColorInputs from 'ColorInputs';

// https://www.npmjs.com/package/color-util#color-format-conversion

const onChangeAction = decorate([
        // just make the action output readable (object -> string)
        // args[0] is color-util Color object
        args => [JSON.stringify(args[0].rgb).replace(/"/g, '')]
    ])
    .action('onChangeAction');

// const onChangeAction = action('onChangeAction');
storiesOf('ColorInputs', module)
    .addDecorator(withKnobs)
    .add('ColorInputs', () => (
        <ColorInputs
            types={array('inputs', ['hex', 'cssrgb'], ',')}
            color={text('color', '#00ff00')}
            onChange={onChangeAction} />
    ));

