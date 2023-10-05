import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import { useSelector } from 'react-redux';

const width = Dimensions.get('screen').width;
const Header = ({ title, leftIcon, rightIcon, onClickLeft, onClickRight }) => {
    const cartItems = useSelector(state => state.cart);
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.btn} onPress={() => onClickLeft()}>
                <Image source={leftIcon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.fontStyle}>{title}</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Cart')}>
                <Image source={rightIcon} style={styles.icon} />
                {rightIcon && <View style={styles.itemCount}>
                    <Text style={{ color: '#000', }}>{cartItems?.data?.length}</Text>
                </View>}
            </TouchableOpacity>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#dae1ed',
        alignItems: 'center',
        paddingLeft: 15, paddingRight: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    fontStyle: {
        color: '#478cfc',
        fontSize: 18,
        fontWeight: '500'
    },
    btn: {
        width: 40, height: 40, justifyContent: 'center', alignItems: 'center'
    },
    icon: {
        width: 25, height: 25, tintColor: '#478cfc'
    },
    itemCount: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});