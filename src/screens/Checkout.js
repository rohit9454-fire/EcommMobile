import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { addItemToCartList, reduceItemToCartList, removeItemFromCart, emptyCart } from '../redux/slices/CartSlice'
import CustomBtn from '../common/CustomBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { orderItem } from '../redux/slices/OrderSlice';


const Checkout = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart);
    const [cartList, setCartList] = useState([]);
    const [slectedMethod, setSelectedMetod] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState('Please Select Address');
    const isFocused = useIsFocused()

    useEffect(() => {
        setCartList(items.data)
    }, [items])

    useEffect(() => {
        getSelectedAddress()
    }, [isFocused])

    const getSelectedAddress = async () => {
        const myDefaultAdd = await AsyncStorage.getItem('MY_ADDRESS');
        if (myDefaultAdd != undefined) {
            setSelectedAddress(JSON.parse(myDefaultAdd))
        } else {
            setSelectedAddress('Please Select Address')
        }

    }

    const getTotal = () => {
        let total = 0;
        cartList.map(item => {
            total = total + item.qty * item.price;
        })
        return total.toFixed(0);
    }

    const orderPlace = (paymentId) => {
        const date = new Date();

        const min = date.getMinutes();
        const h = date.getHours();
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        let ampm = '';
        if (h > 12) { ampm = "PM" } else { ampm = "AM" }

        const data = {
            items: cartList,
            amount: '$' + getTotal(),
            address: selectedAddress,
            paymentId: paymentId,
            userId: '',
            placedAt: d + "/" + m + "/" + y + " " + h + ":" + min + " " + ampm,
            paymentStatus: slectedMethod === 3 ? 'Pending' : 'Success',
        };
        dispatch(orderItem(data));
        dispatch(emptyCart([]));
        navigation.navigate('OrderSuccess')
    }

    const payNow = () => {
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_iiGt4ck6VD6hCm', // Your api key
            amount: getTotal() * 100,
            name: 'E-Comm',
            prefill: {
                email: 'ecom@gmail.com',
                contact: '9191919191',
                name: 'E-Comm'
            },
            theme: { color: '#45a8f5' }
        }
        RazorpayCheckout.open(options).then((data) => {
            orderPlace(data.razorpay_payment_id)
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header title={'Checkout'} leftIcon={require('../Images/back.png')} onClickLeft={() => { navigation.goBack() }} />
                <Text style={styles.title}>Added Items</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ height: Dimensions.get('screen').height * 0.3 }}>
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
                    </View>
                    <View style={styles.totalView}>
                        <Text style={[styles.title, { marginTop: 0 }]}>Total</Text>
                        <Text style={[styles.title, { marginRight: 20, marginTop: 0 }]}>{'$ ' + getTotal()}</Text>
                    </View>
                    <View style={styles.paymentView}>
                        <Text style={[styles.title]}>Select Payment Mode</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.paymentMethods} onPress={() => setSelectedMetod(0)}>
                            <Image source={slectedMethod === 0 ? require('../Images/radio.png') : require('../Images/radio-unfill.png')} style={[styles.radioIcon, { tintColor: slectedMethod === 0 ? 'orange' : '#000' }]} />
                            <Text style={styles.paymentMethodsText}>Credit Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.paymentMethods} onPress={() => setSelectedMetod(1)}>
                            <Image source={slectedMethod === 1 ? require('../Images/radio.png') : require('../Images/radio-unfill.png')} style={[styles.radioIcon, { tintColor: slectedMethod === 1 ? 'orange' : '#000' }]} />
                            <Text style={styles.paymentMethodsText}>Debit Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.paymentMethods} onPress={() => { setSelectedMetod(2) }}>
                            <Image source={slectedMethod === 2 ? require('../Images/radio.png') : require('../Images/radio-unfill.png')} style={[styles.radioIcon, { tintColor: slectedMethod === 2 ? 'orange' : '#000' }]} />
                            <Text style={styles.paymentMethodsText}>UPI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.paymentMethods} onPress={() => { setSelectedMetod(3) }}>
                            <Image source={slectedMethod === 3 ? require('../Images/radio.png') : require('../Images/radio-unfill.png')} style={[styles.radioIcon, { tintColor: slectedMethod === 3 ? 'orange' : '#000' }]} />
                            <Text style={styles.paymentMethodsText}>Cash on Delivery</Text>
                        </TouchableOpacity>
                        <View style={styles.addressView}>
                            <Text style={styles.title}>Address</Text>
                            <Text style={[styles.title, { textDecorationLine: 'underline', color: '#0269A0FB' }]} onPress={() => navigation.navigate('Addesses')}>Edit Address</Text>
                        </View>
                        {typeof (selectedAddress) === 'object' ? <Text style={[styles.title, { marginTop: 5, fontSize: 14, color: '#636363' }]}>{`H.No ${selectedAddress?.flat}` + ` ${selectedAddress?.city}` + ` ${selectedAddress?.state}` + `\n${selectedAddress?.pin}`}</Text> :
                            <Text style={[styles.title, { marginTop: 5, fontSize: 14, color: '#636363' }]}>{selectedAddress}</Text>}

                        <CustomBtn
                            title={'Pay & Order'}
                            btnView={{ backgroundColor: 'green', marginLeft: 20, width: '70%', alignSelf: 'center' }}
                            onPress={() => payNow()}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18,
        marginLeft: 20,
        marginTop: 30,
        color: '#000'
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
    totalView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 35,
        borderBottomWidth: 0.8,
        borderBottomColor: '#B7B7B7'
    },
    paymentView: {

    },
    paymentMethods: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 20,
        paddingLeft: 20
    },
    radioIcon: {
        height: 24,
        width: 24,
        paddingLeft: 20,
        resizeMode: 'contain',
    },
    paymentMethodsText: {
        marginLeft: 15,
        fontSize: 14,
        color: '#000'
    },
    addressView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 0,
        paddingRight: 20
    }

})