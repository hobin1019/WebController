import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types'

export default function WebPage({htmlSource, htmlAddr}) {
    // console.log(htmlSource);
    return (
        <View style={styles.container}>
            <WebView source={{html: htmlSource, baseUrl:htmlAddr}}/>
        </View>
    );
}
WebPage.propTypes = {
    htmlSource: PropTypes.string.isRequired,
    htmlAddr: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'steelblue',
      overflow: 'hidden',
    },
  });