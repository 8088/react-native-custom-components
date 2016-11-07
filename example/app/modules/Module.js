import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
export default class Module extends Component {
    render() {
        return (
            <View style={styles.module}>
                <View style={styles.module_head}><Text style={styles.module_head_text}>{this.props.title}</Text></View>
                <View style={styles.module_body}>{this.props.children}</View>
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
    module:{
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    module_head:{
        padding: 15,
        paddingVertical: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    module_head_text:{
        fontWeight: 'bold',
    },
    module_body: {
        padding: 15,
    }

});
