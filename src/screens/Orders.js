import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const Orders = () => {
    const navigation = useNavigation();
    const ordersList = useSelector(state => state.order);
    const [orderedItem, setOrderedItem] = useState([]);

    useEffect(() => {
        setOrderedItem(ordersList?.data)
    }, [ordersList])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={'Orders'} leftIcon={require('../Images/back.png')} onClickLeft={() => { navigation.goBack() }} />
            <View style={styles.container}>
                <FlatList
                    data={orderedItem}
                    renderItem={({ item, index }) => {
                        console.log('Item -', item);
                        return (
                            <View style={styles.orderItem}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <Text style={styles.dateTxt}>Order Placed At</Text>
                                    <Text style={styles.dateTxt}>{item.placedAt}</Text>
                                </View>
                                <FlatList
                                    data={item.items}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={styles.productItem}>
                                                <Image source={{ uri: item.image }} style={styles.img} />
                                                <View style={styles.nameView}>
                                                    <Text style={[styles.priceTxt, { fontSize: 16, lineHeight: 18, color: '#000' }]}>{item.title.length > 20 ? item.title.substring(0, 20) : item.title}</Text>
                                                    <Text style={[styles.priceTxt, { fontSize: 14, lineHeight: 16, color: '#000', fontWeight: '400' }]}>{item.description.length > 35 ? item.description.substring(0, 35) : item.description}</Text>
                                                    <Text style={styles.priceTxt}>{item.price}</Text>
                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    orderItem: {
        width: '90%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderWidth: 0.8,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20
    },
    productItem: {
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    img: {
        width: 50,
        height: 50
    },
    nameView: {
        marginLeft: 20
    },
    priceTxt: {
        fontSize: 16,
        color: 'green',
        fontWeight: '600',
        marginTop: 10,
        lineHeight: 18
    },
    dateTxt: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10,
        color: 'blue'
    }
})