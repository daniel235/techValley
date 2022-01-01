import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import storeInfo from './apis/data';

var name = "Danny";

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

var newData = storeInfo();


const Item = ({title}) => (
    <View style={Styles.itemStyle}>
        <Text style={Styles.itemText}>{title}</Text>
    </View>
)

const renderItem = ({item}) => (
    <Item title={item.title}/>
)

const HomeScreen = () => {
    return(
        <View style={Styles.homeView}>
            <Text>Hello {name}</Text>
            <FlatList
                style={Styles.horizontalList}
                horizontal={true}
                data={DATA}
                renderItem={renderItem}
            />
            <FlatList
                style={Styles.horizontalList}
                data={DATA}
                renderItem={renderItem}
            />
            <Text>Home</Text>
        </View>
    );
}

export default HomeScreen;

const Styles = StyleSheet.create({
    homeView : {
        flex: 1,
        backgroundColor : "#2C2181",
        color: 'white'
    },
    horizontalList : {
        backgroundColor : 'white',
        height: 40,
    },
    itemStyle : {
        marginTop: 32,
        marginBottom: 22,
        paddingLeft: 5,
        paddingRight: 5
    },
    itemText : {
        fontSize: 20,
        fontWeight: '500',
        color: 'black'
    }
})
