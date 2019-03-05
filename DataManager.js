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
    // testRemoveMultiData() {
    //     AsyncStorage.multiRemove(this.recentKeyList);
    // }
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
        for (var i = 0; i < urlList.length; i++) {
            if (urlList[i] === url) {
                if (i === 0) return urlList;
                for (var j = i - 1; j >= 0; j--) {
                    urlList[j + 1] = urlList[j];
                }
                urlList[0] = url;
                return urlList;
            }
        }
        // console.log(">> " + urlList);
        for (var i = urlList.length - 2; i >= 0; i--) {
            urlList[i + 1] = urlList[i];
        }
        urlList[0] = url;
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