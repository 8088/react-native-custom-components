//mark: TODO->模拟a 标签, 实现条转链接href 实现跳转APP内部页面target.

import React, { PureComponent, PropTypes } from 'react';

import {
    Text,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    link: {
        color: 'blue',
    },
});

export default class Link extends PureComponent {
    static propTypes = {
        children: PropTypes.string,
        onPress: PropTypes.func,
        component: PropTypes.func,
        passProps: PropTypes.shape({}),
    };
    static contextTypes = {
        navigator: PropTypes.object,
    };
    onPress = () => {
        const { navigator } = this.context;
        const { component, passProps, onPress } = this.props;
        if (onPress && onPress()) {
            return;
        }
        if (component) {
            navigator.push({
                component,
                passProps,
            });
        }
    };
    render() {
        const { children } = this.props;
        return <Text style={styles.link} onPress={this.onPress}>{children}</Text>;
    }
}