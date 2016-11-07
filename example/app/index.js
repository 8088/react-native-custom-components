/**
 * A-mili React Native App
 *
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    ScrollView,
    StyleSheet,
} from 'react-native';

import {
    Button,
    ToggleButton,
    HtmlView,
    InputEditor,
    SlideBox,
    Tabbar,
    Tabbody,
} from 'react-native-custom-components';
import Icon from 'react-native-vector-icons/Ionicons';

import Network from './mixins/Network';
import Topbar from './modules/Topbar';
import Module from './modules/Module';

const HTML = `
<img src="http://img.mp.itc.cn/upload/20160922/f6729f9c3b15436cac418a02c01bba2b_th.jpeg">
<p><span style="font-size: 14px; color:#f60;">2016年9月20日，美国纽约，美国总统奥巴马出席第71届联合国大会。图片来源：视觉中国</span></p>
`;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {id:0, name:'标签页'},
                {id:1, name:'TestTest2'},
                {id:2, name:'Test3'},
                {id:3, name:'TabName4'},
                {id:4, name:'TabName5'},
                {id:5, name:'TabName6'},
                {id:6, name:'TabName7'},
            ],
            activeTab: 0,
            scrollValue:null,
        };
    }

    componentDidMount() {
        //
        global.xxx = 'test'

        //alert(xxx)
    }

    componentWillUnmount(){
        this.unmounting = true;
    }

    render() {
        var {
            activeTab,
            tabs,
            scrollValue,
        }=this.state;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='rgba(255,255,255,0.1)' hidden={false} animated={true} translucent={true} barStyle='default'/>
                <Topbar title='自定义组件'/>
                <ScrollView style={styles.flex_1}>

                    <View style={styles.module}>
                        <View style={styles.module_head}>
                            <Tabbar
                                tabs={tabs}
                                activeTab={activeTab}
                                toggleTab={this._toggleTab}
                                scrollValue={scrollValue}
                                underlineColor={'pink'}
                            />
                        </View>
                        <View style={{padding: 15, height:200}}>
                            <Tabbody
                                showPage={activeTab}
                                relationTabbar={(value)=>{
                                    this.setState({scrollValue:value});
                                }}
                                onChangeTab={this._toggleTab}>
                                <View style={styles.tab_page}><Text>Tab page 1</Text></View>
                                <View style={styles.tab_page}><Text>Tab page 2</Text></View>
                                <View style={styles.tab_page}><Text>Tab page 3</Text></View>
                                <View style={styles.tab_page}><Text>Tab page 4</Text></View>
                                <View style={styles.tab_page}><Text>Tab page 5</Text></View>
                                <View style={styles.tab_page}><Text>Tab page 6</Text></View>
                                <View style={styles.tab_page}><Text>Tab page 7</Text></View>
                            </Tabbody>
                        </View>
                    </View>

                    <Module title='焦点图轮播'>
                        <View style={{flex:1, height:150, backgroundColor:'#999'}}>
                            <SlideBox dotColor={'#FE7A93'}>
                                <View style={styles.flex_1}>
                                    <Image style={styles.flex_1} source={{uri: 'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024'}}/>
                                </View>
                                <View style={styles.flex_1}>
                                    <Image style={styles.flex_1} source={{uri: 'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024'}}/>
                                </View>
                                <View style={styles.flex_1}>
                                    <Image style={styles.flex_1} source={{uri: 'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024'}}/>
                                </View>
                            </SlideBox>
                        </View>
                    </Module>
                    <Module title='自适应HTML内容高度显示控件'>
                        <HtmlView source={{html:HTML}} width={310}/>
                    </Module>
                    <Module title='按钮控件'>
                        <View style={[styles.flex_row, styles.flex_wrap, styles.margin_bottom_10]}>
                            <Button onPress={this._onPress} style={styles.btn_default} elementId={'btn1'} >
                                <Text style={[styles.color_deep,styles.font_size_14]}>通用按钮</Text>
                            </Button>
                            <Button onPress={this._onPress} disabled={true} style={[styles.btn_default, styles.margin_left_10]} elementId={'btn2'} >
                                <Text style={[styles.color_gray,styles.font_size_14]}>无禁用状态</Text>
                            </Button>
                            <Button onPress={this._onPress} disabled={true} style={[styles.btn_disabled, styles.margin_left_10]} elementId={'btn3'} >
                                <Text style={[styles.color_gray,styles.font_size_14]}>禁用按钮</Text>
                            </Button>
                        </View>

                        <Button onPress={this._onPress} style={[styles.btn_default, styles.margin_bottom_10]} elementId={'btn4'} >
                            <Text style={[styles.color_deep,styles.font_size_14]}>通用按钮</Text>
                        </Button>
                        <Button onPress={this._onPress} disabled={true} style={styles.btn_default} elementId={'btn5'}
                                renderDisabled={this._renderDisabled}>
                            <Text style={[styles.color_deep,styles.font_size_14]}>通用按钮</Text>
                        </Button>

                        <View style={[styles.flex_row, styles.flex_wrap, styles.align_start, styles.margin_top_10]}>
                            <Button onPress={this._onPress1} disabled={this.state.disabled} style={styles.btn_default} elementId={'btn6'}
                                ref='btn6' renderDisabled={this._renderDisabled}>
                                <Text style={[styles.color_deep,styles.font_size_14]}>带禁用状态的按钮</Text>
                            </Button>
                            <Button onPress={this._onReset} style={[styles.btn_default, styles.margin_left_10]} elementId={'btn7'} >
                                <Text style={[styles.color_deep,styles.font_size_14]}>恢复按钮</Text>
                            </Button>
                        </View>
                    </Module>
                    <Module title='切换控件'>
                        <View style={[styles.flex_row, styles.flex_wrap, styles.margin_bottom_10]}>
                            <ToggleButton onPress={this._onToggle} disabled={false} checked={false}>
                                <Button style={styles.btn_default} elementId={'btnA'} renderDisabled={this._renderDisBtn.bind(this, '切换按钮A')} >
                                    <Text style={[styles.color_deep,styles.font_size_14]}>切换按钮A</Text>
                                </Button>
                                <Button style={styles.btn_default} elementId={'btnB'} renderDisabled={this._renderDisBtn.bind(this, '切换按钮B')} >
                                    <Text style={[styles.color_deep,styles.font_size_14]}>切换按钮B</Text>
                                </Button>
                            </ToggleButton>
                            <ToggleButton disabled={true} checked={false} style={styles.margin_left_10}>
                                <Button style={styles.btn_default} elementId={'btnA'} >
                                    <Text style={[styles.color_gray,styles.font_size_14]}>无禁用状态</Text>
                                </Button>
                                <Button style={styles.btn_default} elementId={'btnB'} >
                                    <Text style={[styles.color_gray,styles.font_size_14]}>切换按钮B</Text>
                                </Button>
                            </ToggleButton>
                            <ToggleButton disabled={true} checked={true} style={styles.margin_left_10}>
                                <Button style={styles.btn_default} elementId={'btnA'} renderDisabled={this._renderDisBtn.bind(this, '切换按钮A')} >
                                    <Text style={[styles.color_deep,styles.font_size_14]}>切换按钮A</Text>
                                </Button>
                                <Button style={styles.btn_default} elementId={'btnB'} renderDisabled={this._renderDisBtn.bind(this, '切换按钮B')} >
                                    <Text style={[styles.color_deep,styles.font_size_14]}>切换按钮B</Text>
                                </Button>
                            </ToggleButton>
                        </View>
                        <View style={[styles.flex_row, styles.flex_wrap, styles.align_center, styles.margin_bottom_10]}>
                            <ToggleButton disabled={true} checked={true}>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={[styles.margin_right_5, {width:16}]}  name='ios-stopwatch-outline' size={20} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>提醒我</Text>
                                </Button>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={styles.margin_right_5}  name='ios-timer-outline' size={20} color='#ccc'/>
                                    <Text style={[styles.font_size_14, styles.color_gray]}>已预约</Text>
                                </Button>
                            </ToggleButton>
                            <ToggleButton disabled={false} checked={false} style={styles.margin_left_10}>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={[styles.margin_right_5, {width:16}]}  name='ios-stopwatch-outline' size={20} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>提醒我</Text>
                                </Button>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={styles.margin_right_5}  name='ios-timer-outline' size={20} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>已预约</Text>
                                </Button>
                            </ToggleButton>

                            <ToggleButton onPress={this._onSwitch} disabled={false} checked={false} style={styles.margin_left_10}>
                                <Button style={styles.btn_switch_off}>
                                    <View style={styles.btn_switch_icon}/>
                                    <Text style={styles.btn_switch_text}>关</Text>
                                </Button>
                                <Button style={styles.btn_switch_on}>
                                    <Text style={styles.btn_switch_text}>开</Text>
                                    <View style={styles.btn_switch_icon}/>
                                </Button>
                            </ToggleButton>

                            <ToggleButton onPress={this._onSwitch1} disabled={false} checked={true} style={styles.margin_left_10}>
                                <Button style={styles.btn_switch_off}>
                                    <View style={styles.btn_switch_icon}/>
                                    <Text style={styles.btn_switch_text}>关</Text>
                                </Button>
                                <Button style={styles.btn_switch_on}>
                                    <Text style={styles.btn_switch_text}>开</Text>
                                    <View style={styles.btn_switch_icon}/>
                                </Button>
                            </ToggleButton>
                        </View>
                        <View style={[styles.flex_row, styles.flex_wrap]}>
                            <ToggleButton disabled={false} checked={false}>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={styles.margin_right_5}  name='ios-add' size={18} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>关注</Text>
                                </Button>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>已关注</Text>
                                </Button>
                            </ToggleButton>
                            <ToggleButton disabled={true} checked={true} style={styles.margin_left_10}>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={styles.margin_right_5}  name='ios-add' size={18} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>关注</Text>
                                </Button>
                                <Button style={[styles.btn_default, styles.flex_row]} renderDisabled={this._renderDisBtn.bind(this, '已关注')} >
                                    <Text style={[styles.font_size_14, styles.color_pink]}>已关注</Text>
                                </Button>
                            </ToggleButton>
                            <ToggleButton onPress={this._onToggle1} disabled={false} checked={false} style={styles.margin_left_10}>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={styles.margin_right_5}  name='ios-add' size={18} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>关注</Text>
                                </Button>
                                <Button style={[styles.btn_default, styles.flex_row]} renderDisabled={this._renderDisBtn.bind(this, '已关注')} >
                                    <Text style={[styles.font_size_14, styles.color_pink]}>已关注</Text>
                                </Button>
                            </ToggleButton>
                        </View>
                    </Module>
                    <Module title='单选控件'>
                        <Text style={styles.color_gray}>TODO: 多个切换控件相关联 组成单选控件</Text>
                    </Module>
                    <Module title='多选控件'>
                        <Text style={styles.color_gray}>TODO: 多个切换控件相关联 组成多选控件</Text>
                    </Module>
                    <Module title='测试POST数据'>
                        <View style={[styles.flex_row, styles.flex_wrap]}>
                            <View style={[styles.text_input, {flex:1, marginRight: 5,}]}>
                                <Text style={styles.color_gray}>测试POST数据</Text>
                            </View>
                            <Button onPress={this._onPost} disabled={this.state.posting} style={styles.btn_default} elementId={'post_btn'}
                                    ref='post_btn' renderDisabled={this._renderDisBtn.bind(this, '发送中...')}>
                                <Text style={styles.color_pink}>POST数据</Text>
                            </Button>
                        </View>
                    </Module>
                </ScrollView>
                <View style={styles.inputbar}>
                    <Button onPress={this._showEditor} style={styles.text_input}>
                        <Icon style={{marginRight:3}}  name='md-create' size={16} color='#ddd'/>
                        <Text style={[styles.font_size_14, styles.color_gray]}>输入编辑器控件..</Text>
                    </Button>
                </View>
                <InputEditor ref='editor' callback={this._onSubmit} placeholder={'编辑器预览文字..'} submitButtonText={'发表'} />
            </View>
        );
    }

    _toggleTab = (index)=> {
        if(!this.unmounting) this.setState({activeTab: index});
        //..
    }

    _showEditor=()=>{
        var editor = this.refs.editor;
        editor.setState({ visible: true });
    }

    _onSubmit=(msg)=>{
        alert('数据提交成功:return true;');
        return true;
    }

    _onPost=(evt)=>{
        var btn = evt.target;
        btn.setState({disabled:true});

        var _url = 'http://api.jinsque.com/index.php?c=post&m=pub_topic';
        var _data ={
            auth_key: "XVxQX1lKXFFaWFlYUFlYXF9K",
            tag: [{"tag_id":1495,"tag_name":"面部轮廓"},{"tag_id":1495,"tag_name":"面部轮廓"},],
            content: "电风扇是你家哦说是个傻逼风格",
            imgs:[{"desc":"好的","height":3072,"width":1728,"uri":"http://imger.jinsque.com/forum/201609/12/pub_adv_1473651876.jpg"},{"desc":"好的","height":3072,"width":1728,"uri":"http://imger.jinsque.com/forum/201609/12/pub_adv_1473651876.jpg"}],
            is_pub: 0,
        };

        Network.post(_url, _data, (info)=>{
            console.log(info)
            btn.setState({disabled:false});
        })
    }

    _renderDisBtn(lable){
        return (
            <View style={styles.btn_disabled}>
                <Text style={[styles.color_gray,styles.font_size_14]}>{lable}</Text>
            </View>
        );
    }

    _renderDisabled(){
        return (
            <View style={styles.btn_disabled}>
                <Text style={[styles.color_gray,styles.font_size_14]}>被禁用的通用按钮</Text>
            </View>
        );
    }

    _onReset=()=>{
        var btn = this.refs.btn6;
        btn.setState({disabled:false})
    }

    _onPress(evt){
        var btn = evt.target;
        alert(btn.props.elementId);
    }

    _onPress1=(evt)=>{
        var btn = evt.target;
        alert(btn.props.elementId);
        btn.setState({disabled:true})
    }

    _onToggle=(evt)=>{
        //mark:需要延时取才能拿到真值, 问题原因请参考:https://facebook.github.io/react/docs/events.html#event-pooling
        var tbtn = evt.target;
        setTimeout(function() {
            alert('checked:'+tbtn.state.checked);
        }, 0);
    }

    _onToggle1=(evt)=>{
        var tbtn = evt.target;
        setTimeout(function() {
            tbtn.setState({disabled:true})
        }, 0);
    }

    _onSwitch=(evt)=>{
        var tbtn = evt.target;
        setTimeout(function() {
            alert('open:'+tbtn.state.checked);
        }, 0);
    }

    _onSwitch1=(evt)=>{
        var tbtn = evt.target;
        setTimeout(function() {
            tbtn.setState({disabled:true})
        }, 0);
    }




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },


    btn_default: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#FFB8C6',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF7F8',
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    btn_disabled: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    btn_switch_off:{
        height: 26,
        width: 54,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: '#bbb',
        alignItems: 'center',
        backgroundColor: '#bbb',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn_switch_on:{
        height: 26,
        width: 54,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: 'rgb(250,110,120)',
        alignItems: 'center',
        backgroundColor: 'rgb(250,110,120)',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn_switch_icon:{
        backgroundColor: '#fff',
        height: 22,
        width: 22,
        borderRadius: 11,
    },
    btn_switch_text:{
        color: '#fff',
        paddingHorizontal: 7,
        fontSize: 12,
        paddingBottom: .5,
    },

    text_input: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 6,
    },

    inputbar: {
        padding: 10,
        backgroundColor: '#fff',
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },

    tab_page:{
        flex: 1,
        backgroundColor: '#eee',
    },



    flex_1:{
        flex: 1,
    },
    flex_wrap: {
        flexWrap: 'wrap',
    },
    flex_row: {
        flexDirection: 'row',
    },
    flex_column: {
        flexDirection: 'column',
    },
    flex_between: {
        justifyContent: 'space-between',
    },
    align_start:{
        alignItems: 'flex-start',
    },
    align_end:{
        alignItems: 'flex-end',
    },
    align_center: {
        alignItems: 'center',
    },

    margin_left_10: {
        marginLeft: 10,
    },
    margin_top_10: {
        marginTop: 10,
    },
    margin_right_10: {
        marginRight: 10,
    },
    margin_bottom_10:{
        marginBottom: 10,
    },
    margin_left_5: {
        marginLeft: 5,
    },
    margin_right_5: {
        marginRight: 5,
    },
    margin_top_5: {
        marginTop: 5,
    },

    color_black: {
        color: '#000',
    },
    color_white:{
        color: '#fff',
    },
    color_gray:{
        color: '#ccc',
    },
    color_deep:{
        color: '#999',
    },
    color_pink:{
        color: '#FE7A93',
    },


    font_size_12:{
        fontSize:12,
    },
    font_size_14:{
        fontSize:14,
    },
    font_size_16:{
        fontSize:16,
    },
    font_size_18:{
        fontSize:18,
    },
    font_size_20:{
        fontSize:20,
    },

    module:{
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    module_head:{
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
});
