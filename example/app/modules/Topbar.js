import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Topbar extends Component {
    render() {
        var back_iconcolor = this.props.color ? this.props.color : 'black';
        return (
            <View style={[styles.topbar, this.props.style]}>
                <View style={styles.left}>
                    {this.props.navigator?<TouchableOpacity
                        onPress={this._onPress}
                        style={[styles.button, {paddingLeft: 12,}]}>
                        <Text style={styles.button_lable}>
                            <Icon name='ios-arrow-back-outline' size={24} color={back_iconcolor}/>
                        </Text>
                    </TouchableOpacity>:null}
                </View>
                <View style={styles.middle}>
                    <Text numberOfLines={1} style={[styles.title, {color: back_iconcolor}]}>{this.props.title}</Text>
                </View>
                <View style={styles.right}/>
            </View>
        );
    }

    _onPress=()=>{
        requestAnimationFrame(()=>{
            this.props.navigator.pop();
        })
    }
}

const styles = StyleSheet.create({
    topbar: {
        paddingTop: 10,
        height: 60,
        borderBottomWidth: 1,
        borderColor: '#EEE',
        backgroundColor: '#fff',
        flexDirection: "row",
    },
    left: {
        flex: 1,
    },
    middle: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        flex: 1,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
    button_lable: {
        fontSize: 16,
        color: '#999',
    },
    title: {
        color: 'black',
        fontSize: 18,
    },

});
