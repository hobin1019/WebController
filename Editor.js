import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableHighlight, Keyboard} from 'react-native';

export default class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            htmlSource: props.app.state.htmlSource,
        }
    }
    componentWillReceiveProps() {
        // console.log("Editor: componentDidMount()")
        this.setState({
            htmlSource: this.props.app.state.htmlSource,
        })
    }
    render(){
        // console.log("Editor: render()")
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.htmlSource}
                    multiline={true}
                    value={this.state.htmlSource}
                    onChangeText={(text) => {
                        this.setState({
                            htmlSource: text,
                        })
                    }}
                    onSubmitEditing={Keyboard.dismiss}
                    returnKeyType='done'
                />
                <TouchableHighlight style={styles.saveButton} onPress={() => this.props.setHtmlSource(this.state.htmlSource)}>
                    <Text>저장</Text>
                </TouchableHighlight>
            </View>
        );
    }
    // _onPressSaveButton(){
    //     this.props.app._setHtmlSource(this.state.htmlSource);
    // }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    htmlSource: {
        flex: 1,
    },
    saveButton: {
        height: 30,
        backgroundColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
    },
  });