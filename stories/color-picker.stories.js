import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ColorPicker from 'ColorPicker';

storiesOf('ColorPicker', module)
    .add('Default', () => (
        <ColorPicker />
    ))
    .add('multiple input types', () => (
        <ColorPicker inputs={['cssrgb', 'cssrgba', 'hex', 'csshsl']} />
    ));
