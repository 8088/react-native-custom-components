# react-native-custom-components
React Native custom components for iOS + Android 

Preview:

![components preview](https://github.com/8088/react-native-custom-components/blob/master/example/component_preview.gif)

Note: custom components only help you achieve functional logic, the components of the UI, style, layout can be customized by youself.

## Installation
```
npm install --save git+git@github.com:8088/react-native-custom-components.git
```

## Usage example

See [example/app/index.js](https://github.com/8088/react-native-custom-components/blob/master/example/app/index.js) for a more detailed example.
See the [Wiki](https://github.com/8088/react-native-custom-components/wiki) usage tips.
```
import {
    Button,
    ToggleButton,
    Stepper,
    HtmlView,
    InputEditor,
    SlideBox,
    ScrollBox,
    Tabbar,
    Tabbody,
    RadioButton,
    RadioGroup,
    CheckBox,
} from 'react-native-custom-components';

//ScrollBox
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

//...

```

