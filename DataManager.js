import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';

const STORAGE_KEY = {
    recentSearch: 'recent',
    favorite: 'favorite',
}
const recentSearchListLength = 10;
const favoriteListLenght = 5;
class DataManager {
    // index 0 is the latest data
    recentKeyList = [];
    favoriteKeyList = [];

    constructor() {
        for (var i = 0; i < recentSearchListLength; i++) {
            this.recentKeyList.push(STORAGE_KEY.recentSearch + i.toString());
        }
        for (var i = 0; i < favoriteListLenght; i++) {
            this.favoriteKeyList.push(STORAGE_KEY.favorite + i.toString());
        }
        // console.log(this.recentKeyList);
        // console.log(this.favoriteKeyList);
    }

    testSetData() {
        // console.log('testSetData')

        // for (var i = 0; i < recentSearchListLength; i++) {
        //     AsyncStorage.setItem(this.recentKeyList[i], 'hi ' + i.toString());
        // }

        // for (var i = 0; i < favoriteListLenght; i++) {
        //     AsyncStorage.setItem(this.favoriteKeyList[i], 'hi ' + i.toString());
        // }

        AsyncStorage.setItem(this.favoriteKeyList[0], 'https://m.naver.com/');
    }
    testRemoveMultiData() {
        // AsyncStorage.multiRemove(this.recentKeyList);
        AsyncStorage.multiRemove(this.favoriteKeyList);
    }

    // get array of value from recent Key List
    getRecentList = async () => {
        result = [];
        try {
            for (var i = 0; i < recentSearchListLength; i++) {
                data = await AsyncStorage.getItem(this.recentKeyList[i]);
                if (data === null) data = '';
                result.push(data);
            }
            // console.log("result : " + result);
            return result;
        } catch (error) {
            alert(error);
            return [];
        }
    }
    getFavoriteList = async () => {
        result = [];
        try {
            for (var i = 0; i < favoriteListLenght; i++) {
                data = await AsyncStorage.getItem(this.favoriteKeyList[i]);
                console.log('### getFavoriteList: ' + data);
                if (data === null) data = '';
                result.push(data);
            }
            // console.log("result : " + result);
            return result;
        } catch (error) {
            alert(error);
            return [];
        }
    }
    setRecentList(urlList, url) {
        if (urlList[0] === url || url === '') return urlList; // do nothing
        
        // get idx where url is in urlList
        existIdx = urlList.length - 1;
        for (var i = 0; i < urlList.length; i++) {
            if (urlList[i] === url) { // get url to front
                existIdx = i;
                break;
            }
        }

        // set url to front
        for (var i = existIdx - 1; i >= 0; i--) {
            urlList[i + 1] = urlList[i];
        }
        urlList[0] = url;

        // set Asyncstorage items
        for (var i = 0; i < recentSearchListLength.length; i++) {
            if (urlList[i] === null) urlList[i] = '';
            AsyncStorage.setItem(this.recentKeyList[i], urlList[i]);
        }

        // console.log(urlList);
        return urlList;
    }
    // setFavoriteList(urlList, url) {
    //     if (urlList[0] === url || url === '') return urlList; // do nothing

        
    // }
    deleteFromFavList(urlList, url) {
        // console.log('### deleteFromFavList : ' + urlList + ' / ' + url)
        
        if (url === '' || urlList.length == 0 || urlList[0] === null || urlList[0] === '') {// do nothing
            // console.log('do nothing')
            return urlList;
        }
        
        // get idx where url is in urlList
        existIdx = - 1;
        for (var i = 0; i < urlList.length; i++) {
            if (urlList[i] === url) { // get url to front
                existIdx = i;
                break;
            }
        }
        // console.log('## existIdx : ' + existIdx);
        if (existIdx < 0) return urlList; // already not exist in favorite list
        
        // set Asyncstorage items
        if (existIdx === urlList.length - 1) {
            urlList[existIdx] = '';
            AsyncStorage.setItem(this.favoriteKeyList[existIdx], '');
            // console.log(urlList);
            return urlList;
        }
        for (var i = existIdx; i < urlList.length - 1; i++) {
            urlList[i] = urlList[i + 1];
            AsyncStorage.setItem(this.favoriteKeyList[i], urlList[i]);
        }
        urlList[urlList.length - 1] = '';
        AsyncStorage.setItem(this.favoriteKeyList[urlList.length - 1], '');

        // console.log('urlList : ' + urlList);
        return urlList;
    }



    getData = async (key) => {
        try {
            data = await AsyncStorage.getItem(key);
            // console.log(data);
            return data;
        } catch (error) {
            alert(error);
            return null;
        }
    }
    getMultiData = async (keys) => {
        try {
            data = await AsyncStorage.multiGet(keys);
            // console.log(data);
            return data;
        } catch (error) {
            alert(error);
        }
    }
}

const dataManager = new DataManager();
export default dataManager;