import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const CustomBtn = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.btnView, props?.btnView]} onPress={() => props.onPress()} >
            <Text style={[styles.title, props.titleStyle]}>{props?.title}</Text>
        </TouchableOpacity>
    )
}

export default CustomBtn;
const styles = StyleSheet.create({
    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#eb9a44',
        borderRadius: 10
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600'
    }
})