import React from 'react';
import {
    PixelRatio,
    Dimensions,
} from 'react-native';
const Util = {
    ratio: PixelRatio.get(),
    pixel: 1 / PixelRatio.get(),
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
    key: 'REACT-NATIVE-TEAM',
    isNative(){
        return !window.location;
    },
    dateFormat(dateTime, fmt) {
        var date = new Date(dateTime);
        fmt = fmt || 'yyyy-MM-dd';
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
};

export default Util;
