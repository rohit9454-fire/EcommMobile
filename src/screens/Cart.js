import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View, Dimensions, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import Header from '../common/Header'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCartList, reduceItemToCartList, removeItemFromCart } from '../redux/slices/CartSlice'
import CheckoutLayout from './CheckoutLayout'

const Cart = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart);
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        setCartList(items.data)
    }, [items])

    const getTotal = () => {
        let total = 0;
        cartList.map(item => {
            total = total + item.qty * item.price;
        })
        return total.toFixed(0);
    }



    return (
        <SafeAreaView>
            <Header title={'Cart Items'} leftIcon={require('../Images/back.png')} onClickLeft={() => { navigation.goBack() }} />
            <View style={styles.listView}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={cartList}
                    ListFooterComponent={<View style={{ height: 50 }} />}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.8} style={styles.productItem}
                                onPress={() => navigation.navigate('ProductDetail', { data: item })}>
                                <Image source={{ uri: item?.image }} style={styles.productImage} />
                                <View>
                                    <Text style={styles.prodtitle}>{item?.title?.length > 20 ? item?.title?.substring(0, 25) + '...' : item?.title}</Text>
                                    <Text numberOfLines={2} style={[styles.prodtitle, { fontSize: 12, marginTop: 10, color: '#757876' }]}>{item?.description}</Text>
                                    <Text numberOfLines={2} style={[styles.prodtitle, { marginTop: 10, color: 'green' }]}>$ {item?.price}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                                        <View style={styles.qtyView}>
                                            <TouchableOpacity style={styles.itemCount} activeOpacity={0.7} onPress={() => dispatch(reduceItemToCartList(item))}>
                                                <Text style={styles.font}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.font}>{item.qty}</Text>
                                            <TouchableOpacity style={styles.itemCount} activeOpacity={0.7} onPress={() => dispatch(addItemToCartList(item))}>
                                                <Text style={styles.font}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={styles.delete} activeOpacity={0.7} onPress={() => dispatch(removeItemFromCart(index))}>
                                            <Image source={require('../Images/delete.png')} style={styles.del} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                {cartList.length < 1 && (
                    <View style={styles.noItems}>
                        <Text>No Items in Cart</Text>
                    </View>
                )}
                {cartList.length > 0 && (
                    <CheckoutLayout
                        items={cartList.length}
                        total={getTotal()}
                    />
                )}

            </View>
        </SafeAreaView>
    )
}

export default Cart;

const styles = StyleSheet.create({
    listView: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.85,
        marginTop: 15,
        alignItems: 'center'
    },
    productItem: {
        width: Dimensions.get('screen').width * 0.9,
        height: Dimensions.get('screen').height * 0.25,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 15,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    productImage: {
        height: 100, width: 100,
    },
    prodtitle: {
        width: Dimensions.get('screen').width * 0.5,
        fontSize: 14,
        color: '#000'
    },
    qtyView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 35,
        width: '50%',
    },
    itemCount: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: '#dae1ed',
        alignItems: 'center', justifyContent: 'center'
    },
    font: {
        fontSize: 22,
        fontWeight: '800',
        color: '#000'
    },
    delete: {
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20

    },
    del: {
        height: 30,
        width: 30
    },
    noItems: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})