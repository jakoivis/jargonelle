
import _ from 'lodash';

export default function getClassName(props, className) {
    let result = '';

    if (className) {
        result = className;
    }

    let propsClassName = _.get(props, 'className');

    if (propsClassName) {
        result = _.trim(result + ' ' + propsClassName);
    }

    return result;
}

// function parseClassName(classes) {
//     let result = _.map(classes, x => _.split(x, ' '));
//     result = _.flattenDeep(result);
//     result = _.filter(result, x => !!x);

//     return _.map(result, x => _.kebabCase(x)).join(' ');

// }