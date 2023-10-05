import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, SafeAreaView, Text, View, Image } from 'react-native';

const OrderSuccess = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require('../Images/success.png')} style={styles.icon} />
            <Text style={styles.msg}>Order Place Successfully....</Text>
            <Text style={styles.btn} onPress={() => navigation.navigate('Home')}>Go To Home</Text>
        </View>
    )
}

export default OrderSuccess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: 100,
        width: 100
    },
    msg: {
        marginTop: 20,
        fontSize: 16,
        color: '#000'
    },
    btn: {
        padding: 10,
        borderWidth: 1,
        color: '#000'
    }
})