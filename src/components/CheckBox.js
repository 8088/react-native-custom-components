/**
 * 复选框
 *
 * @flow
 */
'use strict';
import React, { PureComponent, PropTypes} from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import Button from './Button';

export default class CheckBox extends PureComponent {
    static propTypes = {
        elementType: PropTypes.string,
        elementId: PropTypes.any,
        disabled: PropTypes.bool,
        checked: PropTypes.bool,
        onPress: PropTypes.func,
        style: View.propTypes.style,
    };

    static defaultProps = {
        elementType: 'CheckBox',
        elementId: null,
        disabled: false,
        checked: false,
        onPress: ()=>{},
        style: null,
    };

    constructor(props){
        super(props);
        this.state = {
            checked: props.checked,
            disabled: props.disabled,
        };

        try{
            if(!props.children || props.children.length!==2) throw 'CheckBox need two Button children!';
            if(props.children[0].props.elementType!=='Button') throw 'CheckBox children[0] must be Button type!';
            if(props.children[1].props.elementType!=='Button') throw 'CheckBox children[1] must be Button type!';
        }
        catch (err){
            this.has_error = true;
            throw err;
        }
    }

    render() {
        if(this.has_error) return null;

        var {
            elementId,
            style,
        }= this.props;
        var { disabled }=this.state;

        return (
            <TouchableOpacity
                elementId={elementId}
                activeOpacity={.6}
                onPress={this._onPress}
                disabled={disabled}
                style={style}>
                <View pointerEvents={'box-only'}>
                    {this._renderButton()}
                </View>
            </TouchableOpacity>
        );
    }

    _renderButton=()=>{
        var { elementId, }= this.props;
        var {checked, disabled}=this.state;
        var btn = this.props.children[checked?1:0];
        var{
            style,
            renderDisabled,
            children,
        } = btn.props;

        return (
            <Button style={style}
                    renderDisabled={renderDisabled}
                    disabled={disabled}
                    elementId={elementId+'_btn'+(checked?1:0)}>
                {children}
            </Button>
        );
    }

    _onPress=(evt)=>{
        this.setState({
            checked: !this.state.checked,
        });
        evt.target = this;
        this.props.onPress(evt);
    }

}

