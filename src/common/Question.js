import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const Question = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text></Text>
            </View>
        </SafeAreaView>
    )
}

export default Question;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})