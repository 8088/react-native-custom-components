/**
 * Network 网络请求
 *
 * https://github.com/facebook/react-native
 */
import React, { PureComponent, PropTypes} from 'react';

function objectToString(obj) {
    var quest = obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            var temp = encodeURIComponent(key)+ '=[';
            temp +=  val.sort().map(function (val2) {
                return JSON.stringify(val2);
            }).join(',');
            return temp +=']';
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
    // console.log('POST: '+quest);
    return quest;
}

export default class Network extends PureComponent {

    static post(url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: objectToString(data),
        };


        fetch(url, fetchOptions)
            .then(res => res.json())
            .then(res => {
                callback(res);
            })
            .done();
    }

    static postJson(url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOptions)
            .then((res) => res.text())
            .then((res) => {
                callback(res);
            })
            .done();
    }

    static get(url, callback) {
        fetch(dataUrl)
            .then((response) => response.json())
            .then((responseData) => {
                callback(responseData);
            })
            .done();
    }


}
