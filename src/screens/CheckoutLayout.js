import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomBtn from '../common/CustomBtn';
import { useNavigation } from '@react-navigation/native';

const CheckoutLayout = ({ total, items }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.tab}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>{`(Items  ${items})`}</Text>
                <Text style={styles.font}>{'Total:  $ ' + total}</Text>
            </View>
            <View style={styles.tab}>
                <CustomBtn
                    title={'Checkout'}
                    btnView={styles.checkout}
                    onPress={() => navigation.navigate('Checkout')}
                />
            </View>
        </View>
    )
}
export default CheckoutLayout;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: 100,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        flexDirection: 'row'
    },
    tab: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkout: {
        width: '80%',
        height: '40%'
    },
    font: {
        fontWeight: '700',
        fontSize: 18,
        color: '#000'
    }
})