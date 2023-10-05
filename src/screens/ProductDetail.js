import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Header from '../common/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addItemToWishList } from '../redux/slices/WishlistSlice';
import { addItemToCartList } from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLoginModal from '../common/AskForLoginModal';



const ProductDetail = () => {
    const [wished, setWished] = useState(false);
    const [isUserLogin, setUserLogin] = useState(false);
    const [isMobalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    useEffect(() => {
        checkUserStatus();
    }, [isUserLogin])


    const checkUserStatus = async () => {
        const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
        if (status == null) {
            setUserLogin(false)
        } else {
            setUserLogin(true)
        }
    }


    const movedInWish = () => {
        dispatch(addItemToWishList(route?.params?.data));
        setWished(true)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                leftIcon={require('../Images/back.png')}
                rightIcon={require('../Images/shopping-cart.png')}
                title={'Product Detail'}
                onClickLeft={() => { navigation.goBack() }}
            />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Image source={{ uri: route?.params?.data?.image }} style={styles.banner} />
                <Text style={styles.title} >{route?.params?.data?.title}</Text>
                <Text style={styles.desc} >{route?.params?.data?.description}</Text>
                <Text style={styles.price} >Price:<Text style={{ color: 'green' }}>   ${route?.params?.data?.price}</Text></Text>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.addCartBtn} activeOpacity={0.8} onPress={() => { dispatch(addItemToCartList(route?.params?.data)) }
                        // { isUserLogin ? dispatch(addItemToCartList(route?.params?.data)) : setIsModalVisible(true) }
                    }>
                        <Text style={styles.addText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wishListBtn} activeOpacity={0.8} onPress={() => movedInWish()}
                    // { isUserLogin ? movedInWish : setIsModalVisible(true)}
                    >
                        <Image source={wished ? require('../Images/heart.png') : require('../Images/heart_unfill.png')} style={styles.wishIcon} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <AskForLoginModal
                modalVisible={isMobalVisible}
                close={() => { setIsModalVisible(false) }}
                onClickLogin={() => {
                    setIsModalVisible(false)
                    navigation.navigate('Login')
                }}
                onClickSignUp={() => {
                    setIsModalVisible(false)
                    navigation.navigate('Signup')
                }}
            />
        </SafeAreaView>
    )
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    wishListBtn: {
        height: 50, width: 50, borderRadius: 25, opacity: 0.8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#d1d1cf'
    },
    addCartBtn: {
        height: '50%', width: '65%', backgroundColor: '#f2b40a', borderRadius: 5, alignItems: 'center', justifyContent: 'center'
    },
    banner: {
        height: Dimensions.get('screen').height * 0.5,
        width: '100%',
        resizeMode: 'contain'
    },
    addText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600'

    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 20, color: '#000'
    },
    desc: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        color: '#757876'
    },
    price: {
        fontSize: 22,
        fontWeight: '800',
        color: '#000',
        marginLeft: 20,
        marginTop: 20
    },
    buttonView: {
        height: 100,
        width: '100%',
        marginTop: 50,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    wishIcon: {
        height: 35,
        width: 35

    }
})