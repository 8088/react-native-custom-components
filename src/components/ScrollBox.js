/**
 * 滚动容器控件
 *
 * - 与SlideBox功能类似,区别是SlideBox基于View此控件基于ScrollView。
 * @flow
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Platform,
    ScrollView,
    Dimensions,
    PanResponder,
} from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    item: {
        flex: 1,
        height: 160,
        width: 310,
    },
    dots: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

class Dot extends Component {
    static propTypes = {
        color: PropTypes.string,
        diameter: PropTypes.number,
        style: View.propTypes.style,
    };

    static defaultProps = {
        color: 'rgba(220, 220, 220, .5)',
        diameter: 8,
    };

    render() {
        const { color, diameter } = this.props;
        let _n = diameter / 2;
        return (
            <View
                style={ [{
                    backgroundColor: color,
                    width: diameter,
                    height: diameter,
                    borderRadius: _n,
                    margin: _n,
                }, this.props.style] }
            />
        );
    }
}

class Dots extends Component {
    static propTypes = {
        total: PropTypes.number,
        active: PropTypes.number,
        style: View.propTypes.style,
    };

    static defaultProps = {
        total: 0,
        active: -1,
    };

    render() {
        const { total, active, style, activeColor, color } = this.props;

        const range = Array.from(new Array(total), (x, i) => i);

        return (
            <View style={ [styles.dots, style] }>
                { range.map(i => {
                    return (
                        <Dot
                            color={ i === active ? activeColor : color }
                            key={ i }
                        />
                    );
                }) }
            </View>
        );
    }
}

export default class ScrollBox extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        index: PropTypes.number,
        threshold: PropTypes.number,
        hasDot: PropTypes.bool,
        flipCallback: PropTypes.func,
        dotColor: PropTypes.string,
        autoplay: PropTypes.bool,
        autoplayTimeout: PropTypes.number,
        dotBottom: PropTypes.number,
    };

    static defaultProps = {
        index: 0,
        hasDot: true,
        threshold: 25,
        flipCallback: () => {},
        dotColor: 'white',
        autoplay: true,
        autoplayTimeout: 2.5,
        dotBottom: 15,
    };

    constructor(props) {
        super(props);
        this.scrolling = false;
        this.state = {
            index: props.index,
            viewWidth: Dimensions.get('window').width,
        };
    }

    componentDidMount() {
        this._autoplay();
    }

    render() {
        var { children, hasDot, dotColor, dotBottom }=this.props;

        const scenes = React.Children.map(children, child => {
            return React.cloneElement(child, { style: [child.props.style, { width: this.state.viewWidth }] });
        });

        return (
            <View style={ { flex: 1, overflow: 'hidden' } } onLayout={ this._onLayout } >
                <ScrollView
                    ref={(scrollView)=>this.scrollView=scrollView}
                    style={styles.wrapper}
                    horizontal
                    pagingEnabled
                    directionalLockEnabled
                    automaticallyAdjustContentInsets={false}
                    scrollsToTop={false}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    scrollEventThrottle={16}
                    scrollEnabled={!this.props.locked}
                    keyboardDismissMode="on-drag"
                    onTouchMove={this._onScrolling}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    >
                    {scenes}
                </ScrollView>
                {hasDot &&
                <Dots
                    active={ this.state.index }
                    activeColor={ dotColor }
                    style={ { position: 'absolute', bottom: dotBottom, width: this.state.viewWidth } }
                    total={ children.length }
                />}
            </View>
        );
    }

    _goToPage=(num)=>{

        this.scrolling = true;

        num = Math.max(0, Math.min(num, this.props.children.length - 1));

        this.scrollView.scrollTo({x:this.state.viewWidth*num});

        this.setState({ index: num },()=>{
            this.scrolling=false;
            if(this.props.autoplay)this._autoplay();
        });

        this.props.flipCallback(num);
    }

    _onLayout=(evt)=>{
        const { width } = evt.nativeEvent.layout;

        if (width) {
            this.setState({ viewWidth: width });
        }
    }

    _autoplay=()=>{
        if(
            !Array.isArray(this.props.children)
            || !this.props.autoplay
            || this.scrolling
        ) {
            return;
        }

        this.autoplayTimer&&clearTimeout(this.autoplayTimer);

        this.autoplayTimer = setTimeout(() => {
            let index = this.state.index+1;
            if(index ===this.props.children.length) index = 0;
            if(!this.scrolling) this._goToPage(index);
        }, this.props.autoplayTimeout * 1000)
    }

    _onScrolling=()=>{
        this.scrolling = true;
        this.autoplayTimer&&clearTimeout(this.autoplayTimer);
    }

    _onMomentumScrollEnd=(evt)=>{
        const offsetX = evt.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / this.state.viewWidth);
        if (this.state.index !== page) {
            this.setState({ index: page });
        }
        this.scrolling = false;
        if(this.props.autoplay)this._autoplay();
    }
}
