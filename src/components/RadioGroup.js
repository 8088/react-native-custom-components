/**
 * 单选按钮组
 * 管理多个单选按钮选择逻辑
 *
 * @flow
 */
'use strict';
import React, { PureComponent, PropTypes} from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import RadioButton from './RadioButton';

export default class RadioGroup extends PureComponent {
    static propTypes = {
        elementType: PropTypes.string,
        elementId: PropTypes.any,
        disabled: PropTypes.bool,
        selected: PropTypes.number,
        onChanged: PropTypes.func,
        style: View.propTypes.style,
    };

    static defaultProps = {
        elementType: 'RadioGroup',
        elementId: null,
        disabled: false,
        selected: -1,
        onChanged: (index)=>{},
        style: null,
    };

    constructor(props){
        super(props);
        this.state = {
            //..
        };

        this._len = 0;
        this.last_select_radio = null;

        try{
            if(!props.children) throw 'RadioGroup least need one RadioButton children!';
        }
        catch (err){
            this.has_error = true;
            throw err;
        }
    }

    componentDidMount() {
        if(this.props.selected>=0){
            this.last_select_radio = this.refs[this.props.elementId+'_'+this.props.selected];
        }
    }

    shouldComponentUpdate(){
        return false;
    }

    componentWillReceiveProps(props){
        if(props.selected!==this.props.selected){
            var radio = this.refs[this.props.elementId+'_'+props.selected];
            this._onSelect(radio);
        }
    }

    render() {
        if(this.has_error) return null;

        var { style, children, }= this.props;

        return (
            <View style={style}>
                {this._createElement(children)}
            </View>
        );
    }

    _createElement=(elements)=>{
        return React.Children.map(elements, (element, index) => {
            if (typeof element !== 'object') return element;

            let props = {};

            if(element.props.elementType==='RadioButton')
            {
                props.disabled = this.props.disabled;
                props.index = this._len++;
                props.ref = this.props.elementId+'_'+props.index;
                if(this.props.selected>=0&&this.props.selected===props.index){
                    props.checked = true;
                }
                props.onPress = (evt)=>{
                    var radio = evt.target;
                    this._onSelect(radio);
                };
            }
            return React.cloneElement(element, {
                ...props,
                children: this._createElement(element.props.children)
            })
        });
    };

    _onSelect=(radio)=>{
        if(this.last_select_radio){
            if(this.last_select_radio===radio) return;
            else this.last_select_radio.setState({checked:false});
        }

        radio.setState({checked:true});

        this.last_select_radio = radio;

        this.props.onChanged(radio.props.index);
    }

}

