/**
 * 自适应HTML控件
 *
 * @flow
 */
'use strict';
import React, { Component, PropTypes} from 'react';
import {
    View,
    WebView,
} from 'react-native';

const HTML = `
<!DOCTYPE html>\n
<html>
<head>
	<meta name="referrer" content="always" />
	<meta charset='utf-8' />
	<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<meta name="format-detection" content="telephone=no"/>
	<title>HTML Container</title>
	<style type="text/css">
	    * {margin:0; padding:0;}
        img{ max-width:100%;height:auto;} 
	</style>
</head>
<body>
    {body}
</body>
</html>
`;
export default class HtmlView extends Component {
    static propTypes = {
        elementType: PropTypes.string,
        elementId: PropTypes.any,
        disabled: PropTypes.bool,
        style: View.propTypes.style,
    };

    static defaultProps = {
        elementType: 'HtmlView',
        elementId: null,
        disabled: false,
        style: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
        };

        if(props.source&&props.source.html&&props.source.html.length>0&&props.source.html.indexOf('<body>')===-1)
        {
            var template = HTML;

            this.source = { html: template.replace('{body}', props.source.html)}
        }
        else{
            this.source = props.source;
        }
    }

    componentWillMount() {
        let autoHeightJsFun = `window.setIntervalCount = 0; window.autoHeight = function() {if(window.setIntervalCount++ < 3) {window.setTimeout(window.autoHeight, 600)}; returnEval(document.documentElement.offsetHeight);};`;
        this.jscode = `
            window.returnEval = function (h) {
                window.location.hash = '#__page_height=' + h;
            };
            ${autoHeightJsFun}
            window.addEventListener('onload', window.autoHeight, false);
            window.autoHeight();
        `;
    }

    render() {
        let height = this._getHeight(this.props.style);
        return (
            <WebView {...this.props}
                style={[this.props.style, {'height':height, backgroundColor:'transparent',}]}
                source={this.source}
                injectedJavaScript={this.jscode}
                onNavigationStateChange={this._onNavigationStateChange}
            />
        );
    }

    _getHeight=(style)=>{
        if (style) {
            if (style.length > 1) {
                let temp = -1;
                for (var item of s) {
                    if (item.height) {
                        temp = item.height;
                    }
                }
                if (temp > 0) {
                    return temp;
                }
            } else if(style.height) {
                return style.height;
            }
        }
        return this.state.height;
    }

    _onNavigationStateChange=(info)=>{
        var index = info.url.indexOf('__page_height=');
        if(index!==-1) {
            var __h = parseInt(info.url.substr(index+14));
            if(__h>0&&this.state.height!=__h)  this.setState({height:__h});
        }
    }

}

