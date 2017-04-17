/**
 * 单选按钮
 * 单个使用类似Button, 多个使用请包含在RadioGroup中
 *
 * @flow
 */
'use strict';
import React, { PureComponent, PropTypes} from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';

export default class RadioButton extends PureComponent {
    static propTypes = {
        elementType: PropTypes.string,
        elementId: PropTypes.any,
        activeOpacity: PropTypes.number,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        renderChecked: PropTypes.func,
        onPress: PropTypes.func,
        style: View.propTypes.style,
    };

    static defaultProps = {
        elementType: 'RadioButton',
        elementId: null,
        activeOpacity: .6,
        checked: false,
        disabled: false,
        renderChecked: null,
        onPress: ()=>{},
        style: null,
    };

    constructor(props){
        super(props);
        this.state = {
            checked: props.checked,
            disabled: props.disabled,
        };
    }

    shouldComponentUpdate(nextPorps, nextState){
        return nextState.checked !== this.state.checked || nextState.disabled !== this.state.disabled;
    }

    render() {
        var {
            elementId,
            activeOpacity,
            renderChecked,
            style,
        }= this.props;
        var {checked, disabled}=this.state;

        return (
            <TouchableOpacity
                elementId={elementId}
                activeOpacity={activeOpacity}
                onPress={this._onPress}
                disabled={disabled}>
                {checked&&renderChecked?renderChecked():<View pointerEvents={'box-only'} style={style}>{this.props.children}</View>}
            </TouchableOpacity>
        );
    }

    _onPress=(evt)=>{
        evt.target = this;
        this.props.onPress(evt);
    }
}

