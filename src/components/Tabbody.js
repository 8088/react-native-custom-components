import React, {Component, PropTypes} from 'react';
import {
    Dimensions,
    Text,
    View,
    Animated,
    ScrollView,
    Platform,
    StyleSheet,
    ViewPagerAndroid,
    InteractionManager,
} from 'react-native';

const StaticContainer = require('react-static-container');
const SceneComponent = (Props) => {
    const {shouldUpdated, ...props,} = Props;
    return <View {...props}>
        <StaticContainer shouldUpdate={shouldUpdated}>
            {props.children}
        </StaticContainer>
    </View>;
};

export default class Tabbody extends Component {
    static propTypes = {
        initialPage: PropTypes.number,
        showPage: PropTypes.number,
        onChangeTab: PropTypes.func,
        onScroll: PropTypes.func,
        relationTabbar: PropTypes.func,
        contentProps: PropTypes.object,
        scrollWithoutAnimation: PropTypes.bool,
        locked: PropTypes.bool,
        prerenderingSiblingsNumber: PropTypes.number,
    };
    static defaultProps = {
        initialPage: 0,
        showPage: -1,
        onChangeTab: () => {
        },
        onScroll: () => {
        },
        relationTabbar: (value)=>{},
        contentProps: {},
        scrollWithoutAnimation: false,
        locked: false,
        prerenderingSiblingsNumber: 0,
    };

    constructor(props) {
        super(props);
        this.callbackTimer=null;
        this.state = {
            currentPage: this.props.initialPage,
            scrollValue: new Animated.Value(this.props.initialPage),
            containerWidth: Dimensions.get('window').width,
            sceneKeys: this.newSceneKeys({currentPage: this.props.initialPage,}),
        };
    }

    componentWillReceiveProps(props) {
        if (props.children !== this.props.children) {
            this.updateSceneKeys({ page: this.state.currentPage, children: props.children, });
        }

        if (props.showPage >= 0 && props.showPage !== this.state.currentPage) {
            this.goToPage(props.showPage);
        }
    }

    componentDidMount() {
        this.props.relationTabbar(this.state.scrollValue);
    }

    componentWillUnmount(){
        if(this.callbackTimer) clearTimeout(this.callbackTimer);
    }

    goToPage = (pageNumber)=> {
        if (Platform.OS === 'ios') {
            const offset = pageNumber* this.state.containerWidth;
            if (this.scrollView) {
                this.scrollView.scrollTo({x: offset, y: 0, animated: !this.props.scrollWithoutAnimation,});
            }
        } else {
            if (this.scrollView) {
                if (this.props.scrollWithoutAnimation) {
                    this.scrollView.setPageWithoutAnimation(pageNumber);
                } else {
                    this.scrollView.setPage(pageNumber);
                }
            }
        }

        const currentPage = this.state.currentPage;
        this.updateSceneKeys({
            page: pageNumber,
            callback: this._onChangeTab.bind(this, currentPage, pageNumber),
        });

    }

    updateSceneKeys = ({
        page, children = this.props.children, callback = () => {
    },
    })=> {
        let newKeys = this.newSceneKeys({previousKeys: this.state.sceneKeys, currentPage: page, children,});
        this.setState({currentPage: page, sceneKeys: newKeys,}, callback);
    }

    newSceneKeys = ({previousKeys = [], currentPage = 0, children = this.props.children,})=> {
        let newKeys = [];
        this._children(children).forEach((child, idx) => {
            let key = this._makeSceneKey(child, idx);
            if (this._keyExists(previousKeys, key) ||
                this._shouldRenderSceneKey(idx, currentPage)) {
                newKeys.push(key);
            }
        });
        return newKeys;
    }

    _children = (children = this.props.children)=> {
        return React.Children.map(children, (child) => child);
    }

    _makeSceneKey = (child, idx)=> {
        return child.props.tabLabel + '_' + idx;
    }

    _keyExists = (sceneKeys, key)=> {
        return sceneKeys.find((sceneKey) => key === sceneKey);
    }

    _shouldRenderSceneKey = (idx, currentPageKey)=> {
        let numOfSibling = this.props.prerenderingSiblingsNumber;
        return (idx < (currentPageKey + numOfSibling + 1) &&
        idx > (currentPageKey - numOfSibling - 1));
    }

    renderScrollableContent = ()=> {
        if (Platform.OS === 'ios') {
            const scenes = this._composeScenes();
            return <ScrollView
                horizontal
                pagingEnabled
                automaticallyAdjustContentInsets={false}
                contentOffset={{x: this.props.initialPage * this.state.containerWidth,}}
                ref={(scrollView) => {
                    this.scrollView = scrollView;
                }}
                onScroll={(e) => {
                    const offsetX = e.nativeEvent.contentOffset.x;
                    this._updateScrollValue(offsetX / this.state.containerWidth);
                }}
                onMomentumScrollBegin={(e) => {
                    const offsetX = e.nativeEvent.contentOffset.x;
                    const page = Math.round(offsetX / this.state.containerWidth);
                    if (this.state.currentPage !== page) {
                        this._updateSelectedPage(page);
                    }
                }}
                onMomentumScrollEnd={(e) => {
                    const offsetX = e.nativeEvent.contentOffset.x;
                    const page = Math.round(offsetX / this.state.containerWidth);
                    if (this.state.currentPage !== page) {
                        this._updateSelectedPage(page);
                    }
                }}
                scrollEventThrottle={16}
                scrollsToTop={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={!this.props.locked}
                directionalLockEnabled
                alwaysBounceVertical={false}
                keyboardDismissMode="on-drag"
                {...this.props.contentProps}
            >
                {scenes}
            </ScrollView>;
        } else {
            const scenes = this._composeScenes();
            return <ViewPagerAndroid
                key={this._children().length}
                style={styles.container}
                initialPage={this.props.initialPage}
                onPageSelected={this._updateSelectedPage}
                keyboardDismissMode="on-drag"
                scrollEnabled={!this.props.locked}
                onPageScroll={(e) => {
                    const {offset, position,} = e.nativeEvent;
                    this._updateScrollValue(position + offset);
                }}
                ref={(scrollView) => {
                    this.scrollView = scrollView;
                }}
                {...this.props.contentProps}
            >
                {scenes}
            </ViewPagerAndroid>;
        }
    }

    _composeScenes = ()=> {
        return this._children().map((child, idx) => {
            let key = this._makeSceneKey(child, idx);
            return <SceneComponent
                key={child.key}
                shouldUpdated={this._shouldRenderSceneKey(idx, this.state.currentPage)}
                style={{width: this.state.containerWidth,}}
            >
                {this._keyExists(this.state.sceneKeys, key) ? child : <View tabLabel={child.props.tabLabel}/>}
            </SceneComponent>;
        });
    }

    _updateSelectedPage = (nextPage)=> {
        let localNextPage = nextPage;
        if (typeof localNextPage === 'object') {
            localNextPage = nextPage.nativeEvent.position;
        }

        const currentPage = this.state.currentPage;
        this.updateSceneKeys({
            page: localNextPage,
            callback: this._onChangeTab.bind(this, currentPage, localNextPage),
        });
    }

    _onChangeTab = (prevPage, currentPage)=> {
        if(Platform.OS==='ios'){
            this.props.onChangeTab(currentPage);
        }
        else{
            if(this.callbackTimer) clearTimeout(this.callbackTimer);
            this.callbackTimer = setTimeout(()=>{
                this.props.onChangeTab(currentPage);
            }, 220);
        }
    }

    _updateScrollValue = (value)=> {
        this.state.scrollValue.setValue(value);
        this.props.onScroll(value);
    }

    render() {
        return <View style={[styles.container, this.props.style,]}>
            {this.renderScrollableContent()}
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
