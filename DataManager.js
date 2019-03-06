import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';

const STORAGE_KEY = {
    favorite: 'favorite',
    recentSearch: 'recent',
}
const recentSearchListLength = 10;
const favoriteListLenght = 5;
class DataManager {
    // index 0 is the latest data
    recentKeyList = [];

    constructor() {
        for (var i = 0; i < recentSearchListLength; i++) {
            this.recentKeyList.push(STORAGE_KEY.recentSearch + i.toString());
        }
        // console.log(this.recentKeyList);
    }

    // testSetData() {
    //     for (var i = 0; i < recentSearchListLength; i++) {
    //         AsyncStorage.setItem(this.recentKeyList[i], 'hi ' + i.toString());
    //     }
    // }
    testRemoveMultiData() {
        AsyncStorage.multiRemove(this.recentKeyList);
    }

    // get array of value from recent Key List
    getRecentList = async () => {
        result = [];
        try {
            for (var i = 0; i < recentSearchListLength; i++) {
                data = await AsyncStorage.getItem(this.recentKeyList[i]);
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
        if (urlList[0] === url || url === '') return; // do nothing
        
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

        // set Asyncstorage
        for (var i = 0; i < urlList.length; i++) {
            if (urlList[i] === null) urlList[i] = '';
            AsyncStorage.setItem(this.recentKeyList[i], urlList[i]);
        }

        // console.log(urlList);
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