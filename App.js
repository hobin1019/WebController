import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, TextInput, TouchableHighlight, Modal} from 'react-native';
import Icon from 'react-native-ionicons'
import Editor from './Editor'
import WebPage from './WebPage'
import dataManager from './DataManager';
import RecentSearchView from './PopoverViews/RecentSearchView'

// const testAddr = 'http://www.fnguide.com/';
const testAddr = 'https://m.naver.com/';
const MENU_STATE = {
  Web: WebPage,
  Editor: Editor,
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this._onPressSearchButton = this._onPressSearchButton.bind(this);
    this._onPressRecentSearchButton = this._onPressRecentSearchButton.bind(this);
    this._onPressWebButton = this._onPressWebButton.bind(this);
    this._onPressEditorButton = this._onPressEditorButton.bind(this);
    this._setHtmlSource = this._setHtmlSource.bind(this);
    this._setModalUnvisible = this._setModalUnvisible.bind(this);

    this.state = {
      htmlAddr: null,
      htmlSource: null,
      MenuState: MENU_STATE.Editor,
      searchBarUrl: testAddr,
      favoriteList: [],
      recentSearchList: [],
      modalVisible: false,
    } 
  }
  async componentDidMount(){

    //get html source
    this._getSourceFromUrl(this.state.searchBarUrl);

    dataManager.testRemoveMultiData();  //test (remove later)
    this.setState({
      recentSearchList: await dataManager.getRecentList(),
    });
    
    
    //test (remove later)... it`s tmp data
    // _onPressSearchButton();
    // tmp = dataManager.setRecentList(this.state.recentSearchList, 'qdsfafasdfasdfasdfasdfasdgdfgsdfgsasdfasdfasddfgsdfgdfg1');
    // this.setState({
    //   recentSearchList: tmp,
    // });
    // tmp = dataManager.setRecentList(this.state.recentSearchList, 'https://www.naver.com');
    // this.setState({
    //   recentSearchList: tmp,
    // });
    // tmp = dataManager.setRecentList(this.state.recentSearchList, 'http://www.fnguide.com');
    // this.setState({
    //   recentSearchList: tmp,
    // });
  }

  render() {
    // console.log("render App.js")
    const {htmlAddr, htmlSource, MenuState, modalVisible} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} barStyle='dark-content' />
        
        <Modal visible={this.state.modalVisible} transparent={true}>
          <RecentSearchView urlList={this.state.recentSearchList} setModalUnvisible={this._setModalUnvisible}/>
        </Modal>
      
        {/* search view */}
        <View style={styles.searchBar}>
          <View style={styles.searchBarTextInputView}
              backgroundColor='white'>
            <TextInput 
              style={styles.searchBarTextInput}
              placeholder='url here'
              value={this.state.searchBarUrl}
              onChangeText={(text) => {
                this.setState({searchBarUrl: text})
              }}
            />
          </View>
          <TouchableHighlight onPress={this._onPressSearchButton}>
              <View>
                <Icon style={{marginRight: 5}} name='ios-search' color='white' size={20}/>
              </View>
          </TouchableHighlight>
        </View>

        {/* top view */}
        <View style={styles.topBar}>
          <View style={styles.menuFavorite}>
            <Text style={styles.menuText}>즐겨찾기</Text>
          </View>
          <TouchableHighlight style={styles.menuRecent} onPress={this._onPressRecentSearchButton}>
            <Text style={styles.menuText}>최근 본 사이트</Text>
          </TouchableHighlight>
        </View>

        {/* contents view */}
        <View style={styles.content}>
          {htmlSource === null ? 
            <Text>Loading...</Text>
            : (MenuState === MENU_STATE.Web ? <WebPage htmlSource={htmlSource} htmlAddr={htmlAddr}/> : <Editor setHtmlSource = {this._setHtmlSource} app={this}/>)
          }
        </View>

        {/* menu bar */}
        <View style={styles.menuBar}>
          {/* 1. web menu */}
          <TouchableHighlight style={[styles.menuWeb, this.state.MenuState === MENU_STATE.Web ? { backgroundColor: 'steelblue' } : null]} onPress={this._onPressWebButton}>
            <Text style={styles.menuText}>웹 뷰</Text>
          </TouchableHighlight>
          {/* 2. editor menu */}
          <TouchableHighlight style={[styles.menuEdit, this.state.MenuState === MENU_STATE.Editor ? { backgroundColor: 'steelblue' } : null]} onPress={this._onPressEditorButton}>
            <Text style={styles.menuText}>에디터</Text>
          </TouchableHighlight>
        </View>


      </View>
    );
  }

  _onPressSearchButton() {
    tmp = dataManager.setRecentList(this.state.recentSearchList, this.state.searchBarUrl);
    this.setState({
      recentSearchList: tmp,
    });
    // console.log(this.state.recentSearchList);
  }
  _onPressRecentSearchButton() {
    this.setState({modalVisible: true})
    console.log(this.state.recentSearchList);
  }
  _onPressWebButton() {
    // console.log('_onPressWebButton');
    if (this.state.MenuState === MENU_STATE.Web) {return;}
    this.setState({
      MenuState: MENU_STATE.Web
    });
    // console.log(this.state.MenuState);
  }
  _onPressEditorButton() {
    // console.log('_onPressEditorButton');
    if (this.state.MenuState === MENU_STATE.Editor) {return;}
    this.setState({
      MenuState: MENU_STATE.Editor
    });
    // console.log(this.state.MenuState);
  }
  _getSourceFromUrl(url) {
    response = fetch(url)
    .then((res) => {
      // console.log(res);
      this.setState({
        htmlAddr: url,
        htmlSource: res.text()._55
      });
    })
  }
  _setHtmlSource(text){
    this.setState({
      htmlSource: text,
    })
  }
  _setModalUnvisible() {
    this.setState({
      modalVisible: false,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'steelblue',
    marginTop: Platform.OS == 'android' ? 0 : 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBarTextInputView: {
    flex: 1,
    margin: 5,
  },
  searchBarTextInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0, // for android
  },
  topBar: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: 'steelblue',
  },
  menuFavorite: {
    flex: 1,
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuRecent: {
    flex: 1,
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  menuBar: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#FAF4C0',
  },
  menuWeb: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuEdit: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    color: 'white',
  }
});
