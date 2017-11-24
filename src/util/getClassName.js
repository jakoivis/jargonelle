
import _ from 'lodash';

export default function getClassName(className, props, state) {

    let result = '';
    let propsClassName = _.get(props, 'className');

    if (className) {

        result = className;
    }

    if (propsClassName) {

        result += ' ' + propsClassName;
    }

    result += ' ' + getCss(props);
    result += ' ' + getCss(state);

    return _.trim(result);
}

function getCss(obj) {

    let css = _.get(obj, 'css');

    if(css) {

        return _.join(_.keys(_.pickBy(css)), ' ');
    }

    return '';
}

// function parseClassName(classes) {
//     let result = _.map(classes, x => _.split(x, ' '));
//     result = _.flattenDeep(result);
//     result = _.filter(result, x => !!x);

//     return _.map(result, x => _.kebabCase(x)).join(' ');

// }