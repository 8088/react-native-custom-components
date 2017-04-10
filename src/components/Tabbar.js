/**
 * 标签页的按钮栏
 *
 * @flow
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Platform,
    ScrollView,
    Dimensions,
} from 'react-native';
import Colors from '../assets/Colors'

const screen_width = Dimensions.get('window').width;

export default class Topbar extends Component {
    static propTypes = {
        toggleTab: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        underlineColor: PropTypes.string,
    };
    static defaultProps = {
        tabs: [{id:'1', name:'tab1'}, {id:'2', name:'tab2'}, {id:'3', name:'tab3'}],
        activeTab: 0,
        toggleTab: ()=> {},
        underlineColor: Colors.main,
    };

    constructor(props) {
        super(props);
        this.state = {
            renderUnderline: false,
            tabScrollValue: 0,
        };
    }

    componentWillMount() {
        this.tabState = [];
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activeTab === this.props.activeTab) return;

        const paddingValue = 20;
        const overscrollValue = 50;
        let curTabLayout = this.tabState[this.props.activeTab];

        if ((curTabLayout.x + curTabLayout.width - this.state.tabScrollValue) > screen_width) {
            let scrollValue = curTabLayout.x + curTabLayout.width - screen_width;
            if (this.props.tabs.length != this.props.activeTab + 1) scrollValue += overscrollValue;
            this.scrollView.scrollTo({x: scrollValue + paddingValue, y: 0});
        } else if (curTabLayout.x < this.state.tabScrollValue) {
            if (this.props.activeTab === 0) this.scrollView.scrollTo({x: 0, y: 0});
            else this.scrollView.scrollTo({x: curTabLayout.x - overscrollValue, y: 0});
        }
    }

    render() {
        var {toggleTab, tabs, activeTab}=this.props;
        return (
            <ScrollView
                automaticallyAdjustContentInsets={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                bounces={false}
                alwaysBounceVertical={false}
                alwaysBounceHorizontal={true}
                contentContainerStyle={styles.tabs}
                ref={(scrollView) => this.scrollView = scrollView}
                onScroll={(evt) => this.setState({tabScrollValue: evt.nativeEvent.contentOffset.x})}>
                {tabs.map((tab, index) => {
                    const isTabActive = activeTab === index;
                    return (
                        <TouchableOpacity
                            style={styles.tab_btn}
                            key={index}
                            onPress={() => toggleTab(index)}
                            onLayout={(evt) => this._onTabLayout(evt, index)}>
                            <Text style={isTabActive ? styles.active_tab_btn_lab : styles.tab_btn_lab}>{tab.name}</Text>
                        </TouchableOpacity>
                    );
                })}
                {this.state.renderUnderline?this._renderUnderline():null}
            </ScrollView>
        );
    }

    _onTabLayout=(evt, index)=>{
        if(this.state.renderUnderline) return;
        var {x, y, width, height} = evt.nativeEvent.layout;
        this.tabState[index] = {x: x, y: y, width: width, height: height};
        if (this.props.tabs.length === Object.keys(this.tabState).length) {
            this.setState({renderUnderline: true});
        }
    }

    _renderUnderline=()=>{
        var inputRange = Object.keys(this.tabState);
        var outputRangeLeft = [];
        var outputRangeWidth = [];
        var {scrollValue}=this.props;
        for (var k in this.tabState) {
            if (this.tabState.hasOwnProperty(k)) {
                outputRangeLeft.push(this.tabState[k].x);
                outputRangeWidth.push(this.tabState[k].width);
            }
        }

        var left = scrollValue?scrollValue.interpolate({
                inputRange: inputRange, outputRange: outputRangeLeft
            }):outputRangeLeft[this.props.activeTab];

        var width = scrollValue?scrollValue.interpolate({
            inputRange: inputRange, outputRange: outputRangeWidth
        }):outputRangeWidth[this.props.activeTab];

        var tabUnderlineStyle = {
            position: 'absolute',
            backgroundColor: this.props.underlineColor,
            height: 3,
            bottom: 0
        };

        return <Animated.View style={[tabUnderlineStyle, {left}, {width}]} />
    }

}

const styles = StyleSheet.create({
    tabs: {
        height: 50,
        paddingRight: 20,
        alignItems: 'center',
    },
    scrollContainer: {
        paddingRight: 20
    },
    tab_btn: {
        padding: 10,
    },
    tab_btn_lab: {
        color: Colors.deep,
    },
    active_tab_btn_lab: {
        color: Colors.main,
        fontWeight: 'normal',
    },
});
