import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../common/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addItemToCartList } from '../redux/slices/CartSlice';
import { removeItemFromWishList } from '../redux/slices/WishlistSlice';
const Wishlist = () => {
    const items = useSelector(state => state.wishlist);
    const [wishListData, setWishListData] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        setWishListData(items.data)
    }, [items]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Wishlist Item'} rightIcon={require('../Images/shopping-cart.png')} />
            <View style={styles.listView}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={wishListData}
                    ListFooterComponent={<View style={{ height: 50 }} />}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.8} style={styles.productItem}
                                onPress={() => navigation.navigate('ProductDetail', { data: item })}>
                                <Image source={{ uri: item?.image }} style={styles.productImage} />
                                <View>
                                    <Text style={styles.prodtitle}>{item?.title?.length > 20 ? item?.title?.substring(0, 25) + '...' : item?.title}</Text>
                                    <Text numberOfLines={2} style={[styles.prodtitle, { fontSize: 12, marginTop: 10, color: '#757876' }]}>{item?.description}</Text>
                                    <View style={styles.priceView}>
                                        <Text numberOfLines={2} style={[styles.prodtitle, { color: 'green', width: 100 }]}>$ {item?.price}</Text>
                                        <TouchableOpacity activeOpacity={0.8} style={styles.moveCartBtn} onPress={() => {
                                            dispatch(addItemToCartList(item))
                                            dispatch(removeItemFromWishList(index))
                                        }}>
                                            <Image source={require('../Images/move-cart.png')} style={{ height: 30, width: 30, }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            {wishListData.length < 1 && (
                <View style={styles.noItems}>
                    <Text>No Items in Wishlist.</Text>
                </View>
            )}
        </SafeAreaView>
    )
}

export default Wishlist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listView: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.85,
        marginTop: 15,
        alignItems: 'center'
    },
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
    priceView: {
        width: Dimensions.get('screen').width * 0.5,
        height: 25,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    moveCartBtn: {
        height: 25,
        width: 50,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10
    },
    noItems: {
        height: '80%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        top: '10%',
        position: 'absolute'
    }
})