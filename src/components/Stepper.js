/**
 * 计数器控件
 *
 * @flow
 */
'use strict';
import React, { PureComponent, PropTypes} from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import Button from './Button';

export default class Stepper extends PureComponent {
    static propTypes = {
        elementType: PropTypes.string,
        elementId: PropTypes.any,
        disabled: PropTypes.bool,
        onChanged: PropTypes.func,
        style: View.propTypes.style,
        initValue: PropTypes.number,
        minValue: PropTypes.number,
        maxValue: PropTypes.number,
    };

    static defaultProps = {
        elementType: 'Stepper',
        elementId: null,
        disabled: false,
        onChanged: (num)=>{},
        style: null,
        initValue: 0,
        minValue:0,
        maxValue: 99,
    };

    constructor(props){
        super(props);

        try{
            if(!props.children || props.children.length<2) throw 'Stepper least need two Button children!';

            if(props.children[0].props.elementType!=='Button') throw 'Stepper children[0] must be Button type!';

            if(props.children[1].type.displayName==='TextInput'){
                var input = props.children[1];
                var _value = parseInt(input.props.value);
            }

            if(props.children.length>2&&props.children[2].props.elementType!=='Button') throw 'Stepper children[2] must be Button type!';
        }
        catch (err){
            this.has_error = true;
            throw err;
        }

        this.state = {
            disabled: props.disabled,
            counter: _value?_value:props.initValue,
        };

    }

    componentDidMount() {

        this.addBtn = this.refs['addBtn'];
        this.subtractBtn = this.refs['subtractBtn'];

        if(this.state.counter===this.props.minValue) this.subtractBtn.setState({disabled:true});
        if(this.state.counter===this.props.maxValue) this.addBtn.setState({disabled:true});
    }

    shouldComponentUpdate(nextPorps, nextState){
        return nextState.counter !== this.state.counter || nextState.disabled !== this.state.disabled;
    }

    render() {
        if(this.has_error) return null;

        const {
            elementId,
            style,
        }= this.props;
        const { disabled, counter }=this.state;

        return (
            <View elementId={elementId} style={style} pointerEvents={'box-none'}>
                {this._renderSubtractButton()}
                {this._renderTextInput()}
                {this._renderAddButton()}
            </View>
        );
    }

    _renderSubtractButton=()=>{
        const { elementId, }= this.props;
        const { disabled, counter }=this.state;
        const btn = this.props.children[0];
        const {
            style,
            renderDisabled,
            children,
        } = btn.props;

        return (
            <Button style={style}
                    ref="subtractBtn"
                    renderDisabled={renderDisabled}
                    disabled={disabled}
                    onPress={this._onSubtract}
                    elementId={elementId+'_subtract_btn'}>
                {children}
            </Button>
        );
    }

    _renderTextInput=()=>{
        const { elementId, initValue }= this.props;
        const { disabled, counter}=this.state;
        var input = this.props.children[1].props.elementType!=='Button'?this.props.children[1]:null;
        if(input===null) return null;
        const {
            style,
        } = input.props;

        return (
            disabled?<Text style={[style, disabled?{color:'#ccc'}:null]}>{counter}</Text>:<TextInput style={style} value={counter.toString()} onBlur={this._onBlur} onChangeText={this._onChangeText} />
        );
    }

    _renderAddButton=()=>{
        const { elementId, }= this.props;
        const { disabled, counter }=this.state;
        var btn = this.props.children[1].props.elementType==='Button'?this.props.children[1]:this.props.children[2];
        const {
            style,
            renderDisabled,
            children,
        } = btn.props;

        return (
            <Button style={style}
                    ref="addBtn"
                    renderDisabled={renderDisabled}
                    disabled={disabled}
                    onPress={this._onAdd}
                    elementId={elementId+'_add_btn'}>
                {children}
            </Button>
        );
    }

    _onBlur=()=>{
        let num = parseInt(this.state.counter);
        if(isNaN(num)){
            this.setState({counter:this.props.initValue});
        }
    }

    _onChangeText = (v) => {
        try {
            if(!isNaN(v))
            {
                let num = parseInt(v);
                if(num<this.props.minValue) return;
                if(num>this.props.maxValue) return;
                this.props.onChanged(num);
            }
            this.setState({counter:v});
        } catch (err) {
            throw 'Stepper num input error!';
        }
    };

    _onSubtract=(evt)=>{
        let num = parseInt(this.state.counter)-1;
        if(num>=this.props.minValue) {
            this.setState({counter:num});
            this.props.onChanged(num);
            this.addBtn.setState({disabled:false});
            if(num===this.props.minValue) this.subtractBtn.setState({disabled:true});
        }
        else this.subtractBtn.setState({disabled:true});
    }

    _onAdd=(evt)=>{
        let num = parseInt(this.state.counter)+1;
        if(num<=this.props.maxValue) {
            this.setState({counter:num});
            this.props.onChanged(num);
            this.subtractBtn.setState({disabled:false});
            if(num===this.props.maxValue) this.addBtn.setState({disabled:true});
        }
        else this.addBtn.setState({disabled:true});
    }

}

