import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, StyleSheet, Dimensions, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addProducts } from '../redux/slices/ProductsSlice';
import Header from '../common/Header';
const Home = () => {
    const [products, setProduct] = useState([])
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = () => {
        fetch('https://fakestoreapi.com/products').then(res => res.json()).then(json => {
            setProduct(json);
            json.map(item => {
                item.qty = 1;
            });
            dispatch(addProducts(json))
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header onClickLeft={() => { navigation.openDrawer(); }} leftIcon={require('../Images/menu-bar.png')} rightIcon={require('../Images/shopping-cart.png')} title={'E-Commerce'} />
            <View style={styles.listView}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={products}
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
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    productItem: {
        width: Dimensions.get('screen').width * 0.9,
        height: Dimensions.get('screen').height * 0.2,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 2,
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
    listView: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.85,
        marginTop: 15,
        alignItems: 'center'
    }
})