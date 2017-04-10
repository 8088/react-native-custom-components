/**
 * 幻灯片容器控件
 *
 * @flow
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Platform,
    Dimensions,
    PanResponder,
} from 'react-native';

const styles = StyleSheet.create({
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

export default class SlideBox extends Component {
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
        autoplay: false,
        autoplayTimeout: 2.5,
        dotBottom: 15,
    };

    constructor(props) {
        super(props);
        this.scrolling = false;
        this.state = {
            index: props.index,
            scrollValue: new Animated.Value(props.index),
            viewWidth: Dimensions.get('window').width,
        };
    }

    componentWillMount() {
        const release = (e, gestureState) => {
            const relativeGestureDistance = gestureState.dx / this.state.viewWidth;
            const { vx } = gestureState;

            let _vx = Platform.OS==='ios'?(gestureState.dx>0?0.5:-0.5):0;
            let newIndex = this.state.index;

            if (relativeGestureDistance < -0.5 || (relativeGestureDistance < 0 && vx < _vx)) {
                newIndex = newIndex + 1;
            } else if (relativeGestureDistance > 0.5 || (relativeGestureDistance > 0 && vx > _vx)) {
                newIndex = newIndex - 1;
            }

            this._goToPage(newIndex);
        };

        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (e, gestureState) => {
                const { threshold } = this.props;

                if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
                    return true;
                }

                if (threshold - Math.abs(gestureState.dx) > 0) {
                    return false;
                }

            },

            onPanResponderRelease: release,
            onPanResponderTerminate: release,

            onPanResponderGrant: (evt, gestureState) => {
                clearTimeout(this.autoplayTimer);
                this.scrolling=true;
            },

            onPanResponderMove: (e, gestureState) => {
                let dx = gestureState.dx;
                let offsetX = -dx / this.state.viewWidth + this.state.index;

                this.state.scrollValue.setValue(offsetX);
            }
        });
    }

    componentDidMount() {
        this._autoplay();
    }

    render() {
        var { children, hasDot, dotColor, dotBottom }=this.props;

        const scenes = React.Children.map(children, child => {
            return React.cloneElement(child, { style: [child.props.style, { flex: 1 }] });
        });

        const translateX = this.state.scrollValue.interpolate({
            inputRange: [0, 1], outputRange: [0, -this.state.viewWidth]
        });

        const sceneContainerStyle = {
            width: this.state.viewWidth * children.length,
            flex: 1,
            flexDirection: 'row',
        };

        return (
            <View style={ { flex: 1, overflow: 'hidden' } } onLayout={ this._onLayout } >
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={ [sceneContainerStyle, { transform: [{ translateX }] }] }
                >
                    { scenes }
                </Animated.View>

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

        this.setState({ index: num });

        Animated.spring(
            this.state.scrollValue,
            { toValue: num, friction: this.props.springFriction, tension: this.props.springTension }
        ).start(()=>{
            this.scrolling = false;
            this._autoplay();
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

        clearTimeout(this.autoplayTimer);

        this.autoplayTimer = setTimeout(() => {
            let index = this.state.index+1;
            if(index ===this.props.children.length) index = 0;
            this._goToPage(index);
        }, this.props.autoplayTimeout * 1000)
    }

}
