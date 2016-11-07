/**
 * 输入编辑器控件
 *
 * @flow
 */
'use strict';
import React, { Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Keyboard,
    Animated,
    Platform,
    TextInput,
    ScrollView,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
import Button from './Button';

export default class InputEditor extends Component {
    static propTypes = {
        elementType: PropTypes.string,
        elementId: PropTypes.any,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        placeholderTextColor: PropTypes.string,
        style: View.propTypes.style,
        visible: PropTypes.bool,
        callback: PropTypes.func,
        submitButtonText: PropTypes.string,

    };

    static defaultProps = {
        elementType: 'InputEditor',
        elementId: null,
        disabled: true,
        placeholder: '',
        placeholderTextColor: '#ccc',
        style: null,
        visible: false,
        callback: ()=>{return true;},
        submitButtonText: 'Submit',
    };

    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
            disabled: props.disabled,
            placeholder: props.placeholder,
            text: '',
            focus: false,
            height: 300,
        };
    }

    componentWillMount () {
        if (Platform.OS === 'ios') {
            this.keyboardWillChangeFrame = Keyboard.addListener('keyboardWillChangeFrame', this._keyboardChange)
        }
        else{
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        }
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.setState({focus:true})
        });
    }

    componentWillUnmount(){
        this.unmounting = true;
        if (Platform.OS === 'ios') {
            this.keyboardWillChangeFrame.remove();
        }
        else{
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
    }

    render() {
        var {placeholderTextColor, submitButtonText}=this.props;
        var { placeholder, visible, focus, disabled, height}=this.state;
        return (
            <Modal
                transparent={true}
                visible={visible}
                onRequestClose={() => {}}
                onShow={this._onShow}
                >
                <TouchableOpacity style={styles.modal_mask} onPress={this._onCancel}/>
                <View style={[styles.input_box]}>
                    <View style={styles.input_area}>
                        <TextInput
                            ref={(textInput)=>this.textInput=textInput}
                            style={[styles.input_text]}
                            multiline={true}
                            value={this.state.text}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderTextColor}
                            keyboardType='ascii-capable'
                            autoFocus={Platform.OS==='ios'}
                            underlineColorAndroid='transparent'
                            selectionColor={'pink'}
                            onChangeText={this._onChangeText}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    </View>
                    <View style={[styles.btn_area]}>
                        <Button disabled={disabled} style={styles.btn_default}
                            onPress={this._onSubmit}
                            renderDisabled={()=>{
                                return(
                                    <View style={styles.btn_disabled}>
                                        <Text style={styles.btn_lable}>{submitButtonText}</Text>
                                    </View>
                                );
                            }}>
                            <Text style={styles.btn_lable}>{submitButtonText}</Text>
                        </Button>
                    </View>
                    {Platform.OS === 'ios'?null:<TextInput autoFocus={focus} style={[styles.input_cover, {height:height}]} />}
                </View>
                {Platform.OS === 'ios'?<View style={{height:height}} />:null}
            </Modal>
        );
    }

    _onShow=()=>{
        //
    }

    _onCancel=()=>{
        let _text = this.state.text.length?this.state.text:'';
        this.setState({visible: false, text:_text, facus:false, height:300})
    }

    _keyboardDidShow=(evt)=> {
        requestAnimationFrame(()=>{
            this.setState({ height: 0 });
            if(this.textInput)this.textInput.focus();
        })
    }

    _keyboardDidHide=(evt)=> {
        this.setState({ height: 300 });
    }

    _keyboardChange=(evt)=>{
        if(evt&&evt.end) this.setState({ height: evt.end.height });
    }

    _onChangeText=(txt)=>{
        let _disabled = txt.length===0;
        this.setState({text:txt, disabled:_disabled});
    }

    _onSubmit=()=>{
        var _callback = this.props.callback;
        if(_callback){
            var _success = _callback(this.state.text);
            if(_success) this.setState({visible: false, disabled:true, text:'', facus:false, height:300})
        }
    }
}

const styles = StyleSheet.create({

    modal_mask: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.5)'
    },

    input_box: {
        backgroundColor: '#f4f4f4',
        overflow: 'hidden',
        height: 150,
        padding: 10,
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },
    input_area: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 3,
        backgroundColor:'#fff',
        height: 100,
        overflow: 'hidden',
        padding: 5,
    },
    input_text: {
        borderWidth: 1,
        borderColor: '#f00',
        fontSize: 14,
        height: Platform.OS==='ios'?90:100,
        paddingTop: Platform.OS==='ios'?0:-60,
    },
    input_cover:{
        marginTop:-150,
        opacity:0,
    },

    btn_area: {
        marginTop: 6,
        alignItems: 'flex-end',
    },
    btn_default: {
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(250,110,120)',
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    btn_disabled: {
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 3,
    },

    btn_lable: {
        color:'#fff',
        fontSize: 14,
    }
});
