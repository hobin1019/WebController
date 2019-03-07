import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types'

const addrHeight = 30;
export default class RecentSearchView extends Component {
    constructor(props) {
        super(props);

        this._onPressUrl = this._onPressUrl.bind(this);
        this._getListLength = this._getListLength.bind(this);
    }
    render() {
        listLength = this._getListLength();
        return (
            <View style={styles.container}>
                {listLength === 0 ? (() => this.props.setModalUnvisible()) :
                    <TouchableHighlight style={styles.background} onPress={() => this.props.setModalUnvisible()}>
                        <View>
                            <View style={styles.diamond} />
                            <View style={[styles.roundedRect, { height: listLength * (addrHeight + 1) }]}>
                                {this.props.urlList.map((url, i) => {
                                    if (url === '' || url === null) return;
                                    return (
                                        <View>
                                            <TouchableHighlight underlayColor='lightgray' style={styles.address} onPress={() => this._onPressUrl(url)}>
                                                <Text>{url}</Text>
                                            </TouchableHighlight>
                                            <View style={styles.line}></View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </TouchableHighlight>
                }
            </View>
        );
    }
    _onPressUrl(url) {
        // console.log(url);
        this.props.setSearchBarUrlAndSearch(url);
    }
    _getListLength() {
        count = 0;
        for (var i = 0; i < this.props.urlList.length; i++) {
            url = this.props.urlList[i]
            if (url === '' || url === null) break;
            count++;
        }
        return count;
    }
}

RecentSearchView.propTypes = {
    urlList: PropTypes.array.isRequired,
    // _setModalUnvisible: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    diamond: {
        top: 0, left: 0, right: 0, bottom: 0,
        position: 'absolute',
        marginTop: Platform.OS == 'android' ? 70 : 100,
        marginLeft: Dimensions.get('window').width * 0.25 - 7.4,
        backgroundColor: 'white',
        width: 15,
        height: 15,
        transform: [{ rotate: '45deg' }],
    },
    roundedRect: {
        position: 'absolute',
        width: '90%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: Platform.OS == 'android' ? 71 : 103,
        marginLeft: '5%',
    },
    address: {
        height: addrHeight,
        paddingLeft: 10, paddingRight: 10,
        justifyContent: 'center',
    },
    line: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#DDD',
        // backgroundColor: 'black',
        height: 1,
    }
});