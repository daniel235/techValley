import React from 'react';
import {Text, View, TextInput, Button } from 'react-native';

const storeInfo = () => {
    let data;
    await fetch("http://10.0.2.2:80/stores").then((datas) => datas.json()).then(
        (datas) => {
            console.log(datas);
            data = datas;
        }
    ).catch((err) => {
        console.log(err);
    });
}

export default storeInfo;