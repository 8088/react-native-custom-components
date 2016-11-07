import React from 'react';
import {
    PixelRatio,
    Dimensions,
} from 'react-native';
const Util = {
    ratio: PixelRatio.get(),
    pixel: 1 / PixelRatio.get(),
    domain : 'http://api.jinsque.com/',
    popToRoute(navigatorObj,routeObj){
      var routes = navigatorObj.state.routeStack;
      for (var i = routes.length - 1; i >= 0; i--) {
        if(routes[i].id === routeObj.id){
          var destinationRoute = navigatorObj.getCurrentRoutes()[i];
          for(o in routeObj){
            destinationRoute[o] = routeObj[o];
          };
          navigatorObj.popToRoute(destinationRoute);
        }
      }
    },
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    post(url, data, callback) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: 'data='+JSON.stringify(data)+''
        };

        fetch(url, fetchOptions)
            .then((response) => {
                return response.text();
            })
            .then((responseData) => {
                callback(responseData);
            });
    },
    key: 'REACT-NATIVE-TEAM',
    isNative(){
        return !window.location;
    },
};


// import {StyleSheet, Platform} from 'react-native';

// export function create(styles: Object): {[name: string]: number} {
//   const platformStyles = {};
//   Object.keys(styles).forEach((name) => {
//     let {ios, android, ...style} = {...styles[name]};
//     if (ios && Platform.OS === 'ios') {
//       style = {...style, ...ios};
//     }
//     if (android && Platform.OS === 'android') {
//       style = {...style, ...android};
//     }
//     platformStyles[name] = style;
//   });
//   return StyleSheet.create(platformStyles);
// }

export default Util;
