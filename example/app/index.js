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
    TextInput,
    StatusBar,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {       
    Button,
    ToggleButton,
    RadioButton,
    RadioGroup,
    Stepper,
    HtmlView,
    InputEditor,
    SlideBox,
    ScrollBox,
    Tabbar,
    Tabbody,
} from 'react-native-custom-components';
import Network from './mixins/Network';
import Colors from './assets/Colors';

import Topbar from './modules/Topbar';
import Module from './modules/Module';

const HTML = `
<img src="http://www.gov.cn/xinwen/2017-04/09/5184425/images/8ee5a0cf03634e65bcc118fcdb7ac5c8.jpg">
<p><span style="font-size: 14px; color:#f60;">4月7日下午，李克强在会见挪威首相之前特意安排近半小时时间，会见来华对上海申办2021年第46届世界技能大赛进行考察评估的世界技能组织主席巴特利等两人</span></p>
`;

const HTML2 = `
<p><b style="font-size: 16px; color:#666;">奥巴马出席第71届联合国大会</b></p>
<img style="margin-top:5px;" src="http://img.mp.itc.cn/upload/20160922/f6729f9c3b15436cac418a02c01bba2b_th.jpeg">
<p><span style="font-size: 14px; color:#666;">2016年9月20日，美国纽约，美国总统奥巴马出席第71届联合国大会。</span></p>
`;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {id:0, name:'标签页'},
                {id:1, name:'TestTest2'},
                {id:2, name:'Test3'},
                {id:3, name:'Tab4'},
                {id:4, name:'TabName5'},
                {id:5, name:'TabName6'},
                {id:6, name:'TabName7'},
            ],
            activeTab: 0,
            scrollValue:null,
            htmlText:HTML,
            counter: 8,
            counter2: 0,
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
            htmlText,
            counter,
            counter2,
        }=this.state;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='rgba(0,0,0,0.1)' hidden={false} animated={true} translucent={true} barStyle='dark-content'/>
                <Topbar title='自定义组件'/>
                <ScrollView style={styles.flex_1}>
                    <Module title='焦点图轮播'>
                        <View style={{flex:1, height:160, backgroundColor:'#999'}}>
                            <ScrollBox dotColor={'#FE7A93'}>
                                <View style={styles.flex_1}>
                                    <Image style={styles.flex_1} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491835031146&di=ff5b484b5a74aca015da29f2a7d71733&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F38%2F47%2F19300001391844134804474917734_950.png'}}/>
                                </View>
                                <View style={styles.flex_1}>
                                    <Image style={styles.flex_1} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491835072917&di=69b4edee69e843bea7d8c3ee579dc71c&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F0423%2F74%2F4.jpg'}}/>
                                </View>
                                <View style={styles.flex_1}>
                                    <Image style={styles.flex_1} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1491825057&di=0aa696c270447276cefe85cd8e4a55b9&src=http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxvOIH6XEAA77F_zYBP8AALHswG2SeoADvsv762.jpg'}}/>
                                </View>
                            </ScrollBox>
                        </View>
                    </Module>

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

                    <View style={styles.module}>
                        <View style={[styles.module_head, styles.flex_row, {justifyContent:'space-between',alignItems:'center', paddingHorizontal:15, paddingVertical:5,}]}>
                            <Text style={styles.module_head_text}>自适应HTML内容高度显示控件</Text>
                            <Button onPress={this._onRefresh} elementId={'refreshBtn'}><Icon name='ios-refresh' size={30} color='#FE7A93'/></Button>
                        </View>
                        <View style={styles.module_body}>
                            <HtmlView source={{html:htmlText}} width={310}/>
                        </View>
                    </View>
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
                                <Button style={styles.btn_default} elementId={'btnA'} renderDisabled={this._renderDisBtn.bind(this, '状态一')} >
                                    <Text style={[styles.color_deep,styles.font_size_14]}>状态一</Text>
                                </Button>
                                <Button style={styles.btn_default} elementId={'btnB'} renderDisabled={this._renderDisBtn.bind(this, '状态二')} >
                                    <Text style={[styles.color_deep,styles.font_size_14]}>状态二</Text>
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
                                <Button style={styles.btn_default} elementId={'btnA'} renderDisabled={this._renderDisBtn.bind(this, '状态一')} >
                                    <Text style={[styles.color_deep,styles.font_size_14]}>状态一</Text>
                                </Button>
                                <Button style={styles.btn_default} elementId={'btnB'} renderDisabled={this._renderDisBtn.bind(this, '状态二')} >
                                    <Text style={[styles.color_deep,styles.font_size_14]}>状态二</Text>
                                </Button>
                            </ToggleButton>
                        </View>
                        <View style={[styles.flex_row, styles.flex_wrap, styles.align_center, styles.margin_bottom_10]}>
                            <ToggleButton disabled={true} checked={true}>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={[styles.margin_right_5, {width:13}]}  name='ios-stopwatch-outline' size={16} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>提醒我</Text>
                                </Button>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={styles.margin_right_5}  name='ios-timer-outline' size={16} color='#ccc'/>
                                    <Text style={[styles.font_size_14, styles.color_gray]}>已预约</Text>
                                </Button>
                            </ToggleButton>
                            <ToggleButton disabled={false} checked={false} style={styles.margin_left_10}>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={[styles.margin_right_5, {width:13}]}  name='ios-stopwatch-outline' size={16} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>提醒我</Text>
                                </Button>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={styles.margin_right_5}  name='ios-timer-outline' size={16} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>已预约</Text>
                                </Button>
                            </ToggleButton>

                            <ToggleButton onPress={this._onSwitch} disabled={false} checked={true} style={styles.margin_left_10}>
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
                                    <Icon style={styles.margin_right_5}  name='ios-add' size={13} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>关注</Text>
                                </Button>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>已关注</Text>
                                </Button>
                            </ToggleButton>
                            <ToggleButton disabled={true} checked={true} style={styles.margin_left_10}>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={styles.margin_right_5}  name='ios-add' size={13} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>关注</Text>
                                </Button>
                                <Button style={[styles.btn_default, styles.flex_row]} renderDisabled={this._renderDisBtn.bind(this, '已关注')} >
                                    <Text style={[styles.font_size_14, styles.color_pink]}>已关注</Text>
                                </Button>
                            </ToggleButton>
                            <ToggleButton onPress={this._onToggle1} disabled={false} checked={false} style={styles.margin_left_10}>
                                <Button style={[styles.btn_default, styles.flex_row]}>
                                    <Icon style={styles.margin_right_5}  name='ios-add' size={13} color='#FE7A93'/>
                                    <Text style={[styles.font_size_14, styles.color_pink]}>关注</Text>
                                </Button>
                                <Button style={[styles.btn_default, styles.flex_row]} renderDisabled={this._renderDisBtn.bind(this, '已关注')} >
                                    <Text style={[styles.font_size_14, styles.color_pink]}>已关注</Text>
                                </Button>
                            </ToggleButton>
                        </View>
                    </Module>
                    <Module title='计数器控件'>
                        <View style={[styles.flex_row, styles.align_center, styles.flex_wrap, styles.margin_bottom_10]}>
                            <Stepper disabled={false} maxValue={10} minValue={0} style={styles.stepper} onChanged={this._onChanged}>
                                <Button style={[styles.stepper_btn, styles.left_btn]} renderDisabled={()=>{
                                    return (
                                        <View style={[styles.stepper_btn_disabled, styles.left_btn]}>
                                            <Icon name='ios-remove' size={24} color={Colors.gray}/>
                                        </View>
                                    );
                                }}>
                                    <Icon name='ios-remove' size={24} color={Colors.pink}/>
                                </Button>
                                <TextInput style={styles.stepper_input} value={counter.toString()} />
                                <Button style={[styles.stepper_btn, styles.right_btn]} renderDisabled={()=>{
                                    return (
                                        <View style={[styles.stepper_btn_disabled, styles.right_btn]}>
                                            <Icon name='ios-add' size={24} color={Colors.gray}/>
                                        </View>
                                    );
                                }}>
                                    <Icon name='ios-add' size={24} color={Colors.pink}/>
                                </Button>
                            </Stepper>
                            <Button onPress={this._getValue} style={[styles.btn_default, styles.margin_left_5]} elementId={'btn1'} >
                                <Text style={[styles.color_deep,styles.font_size_14]}>Get Counter</Text>
                            </Button>
                            <Text style={[styles.stepper_txt]}>{counter2.toString()}</Text>
                            <Stepper disabled={false} initValue={0} maxValue={9999} minValue={0} style={styles.stepper} onChanged={this._onChanged2}>
                                <Button style={[styles.stepper_btn, styles.left_btn, ]} renderDisabled={()=>{
                                    return (
                                        <View style={[styles.stepper_btn_disabled, styles.left_btn]}>
                                            <Icon name='ios-remove' size={24} color={Colors.gray}/>
                                        </View>
                                    );
                                }}>
                                    <Icon name='ios-remove' size={24} color={Colors.pink}/>
                                </Button>
                                <Button style={[styles.stepper_btn, styles.right_btn]} renderDisabled={()=>{
                                    return (
                                        <View style={[styles.stepper_btn_disabled, styles.right_btn]}>
                                            <Icon name='ios-add' size={24} color={Colors.gray}/>
                                        </View>
                                    );
                                }}>
                                    <Icon name='ios-add' size={24} color={Colors.pink}/>
                                </Button>
                            </Stepper>
                        </View>
                    </Module>

                    <Module title='单选控件'>
                        <RadioButton
                            elementId="myRadio"
                            onPress={this._onRadioPress}
                            style={[styles.flex_row, styles.align_center]}
                            renderChecked={()=>{
                                return (
                                    <View style={[styles.flex_row, styles.align_center]}>
                                        <View style={styles.radio_btn}>
                                            <View style={styles.radio_btn_checked}/>
                                        </View>
                                        <Text style={styles.radio_txt}>选中后不可单独取消</Text>
                                    </View>
                                );
                            }}>
                            <View style={styles.radio_btn} />
                            <Text style={styles.radio_txt}>一个单独的单选控件</Text>
                        </RadioButton>
                        <View style={styles.separator} />
                        <RadioGroup name={'radio1'} selected={radio} style={styles.flex_row} onChanged={this._onRadioChanged}>

                            <RadioButton
                                style={[styles.flex_row, styles.align_center, styles.margin_right_10]}
                                renderChecked={()=>{
                                    return (
                                        <View style={[styles.flex_row, styles.align_center, styles.margin_right_10]}>
                                            <View style={styles.radio_btn}>
                                                <View style={styles.radio_btn_checked}/>
                                            </View>
                                            <Text style={styles.radio_txt}>选项一</Text>
                                        </View>
                                    );
                                }}>
                                <View style={styles.radio_btn} />
                                <Text style={styles.radio_txt}>选项一</Text>
                            </RadioButton>

                            <RadioButton
                                style={[styles.flex_row, styles.align_center, styles.margin_right_10]}
                                renderChecked={()=>{
                                    return (
                                        <View style={[styles.flex_row, styles.align_center, styles.margin_right_10]}>
                                            <View style={styles.radio_btn}>
                                                <View style={styles.radio_btn_checked}/>
                                            </View>
                                            <Text style={styles.radio_txt}>选项二</Text>
                                        </View>
                                    );
                                }}>
                                <View style={styles.radio_btn} />
                                <Text style={styles.radio_txt}>选项二</Text>
                            </RadioButton>

                            <RadioButton
                                style={[styles.flex_row, styles.align_center]}
                                renderChecked={()=>{
                                    return (
                                        <View style={[styles.flex_row, styles.align_center]}>
                                            <View style={styles.radio_btn}>
                                                <View style={styles.radio_btn_checked}/>
                                            </View>
                                            <Text style={styles.radio_txt}>选项三</Text>
                                        </View>
                                    );
                                }}>
                                <View style={styles.radio_btn} />
                                <Text style={styles.radio_txt}>选项三</Text>
                            </RadioButton>

                        </RadioGroup>

                        <View style={[styles.flex_row, styles.margin_top_5]}>
                            <Button onPress={()=>alert(this.state.radio)} style={[styles.btn_default, styles.margin_right_5]} elementId={'btn1'} >
                                <Text style={[styles.color_deep,styles.font_size_14]}>Get index</Text>
                            </Button>
                            <Button onPress={()=>this.setState({radio:0})} style={[styles.btn_default, styles.margin_right_5]} elementId={'btn1'} >
                                <Text style={[styles.color_deep,styles.font_size_14]}>Set index(0)</Text>
                            </Button>
                        </View>
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

    _onChanged=(value)=>{
        try {
            this.setState({counter:parseInt(value)});
        } catch (err) {
            //..
        }
    }

    _getValue=()=>{
        alert(this.state.counter)
    }

    _onChanged2=(value)=>{
        try {
            this.setState({counter2:parseInt(value)});
        } catch (err) {
            //..
        }
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

    _onRefresh=(evt)=>{
        var btn = evt.target;
        var _html = this.state.htmlText===HTML?HTML2:HTML;
        this.setState({htmlText: _html});
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

    _onRadioPress=(evt)=>{
        var radio = evt.target;
        radio.setState({checked:true});
    }

    _onRadioChanged=(index)=>{
        this.setState({radio:index});
        alert('select changed: '+index);
    }




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
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


    //stepper
    stepper:{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFB8C6',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf:'flex-start',
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    stepper_btn:{
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF1F2',
        paddingHorizontal: 8,
        paddingTop:1,
    },
    stepper_btn_disabled:{
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF7F8',
        paddingHorizontal: 8,
        paddingTop:1,
    },
    left_btn:{
        borderBottomRightRadius:0,
        borderTopRightRadius:0,
    },
    right_btn:{
        borderBottomLeftRadius:0,
        borderTopLeftRadius:0,
    },
    stepper_txt:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        textAlign:'center',
        color: '#777',
        fontSize: 20,
    },
    stepper_input:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        textAlign:'center',
        color: '#777',
    },



    //radio button
    radio_btn: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radio_btn_checked: {
        borderRadius: 7,
        backgroundColor: Colors.pink_translucent,
        height: 14,
        width: 14,
    },
    radio_txt:{
        color: Colors.deep,
        marginLeft: 5,
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
    module_head_text:{
        fontWeight: 'bold',
    },
    module_body: {
        padding: 15,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
        marginVertical: 10,
    },
});
