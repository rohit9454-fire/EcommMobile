import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, SafeAreaView, StyleSheet, View, Image, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../common/Header';



const Search = () => {
    const products = useSelector(state => state);
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [oldData, setOldData] = useState(products.product.data);
    const [searchedList, setSearchedList] = useState([]);


    const filterData = (text) => {
        let newData = oldData.filter(item => {
            return item.title.toLowerCase().match(text.toLowerCase());
        });
        setSearchedList(newData);
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header onClickLeft={() => { navigation.openDrawer(); }} leftIcon={require('../Images/menu-bar.png')} title={'Search Items'} />
            <View style={styles.searchView}>
                <View style={styles.childView}>
                    <Image source={require('../Images/search.png')} style={styles.icon} />
                    <TextInput
                        placeholder='Search Items here...'
                        placeholderTextColor={'#000'}
                        style={styles.input}
                        value={search}
                        onChangeText={text => {
                            setSearch(text);
                            filterData(text);
                        }}
                    />
                </View>
                {search !== '' &&
                    (<TouchableOpacity activeOpacity={0.5} style={[styles.icon, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => setSearch('')}>
                        <Image source={require('../Images/clear.png')} style={[styles.icon, { width: 16 }]} />
                    </TouchableOpacity>)}
            </View>
            {search !== '' && (<FlatList
                data={searchedList}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.listView} onPress={() => navigation.navigate('ProductDetail', { data: item })}>
                            <Image source={{ uri: item?.image }} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                            <Text style={styles.title}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
            />)}
        </SafeAreaView>
    )
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    childView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchView: {
        width: '90%',
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        borderRadius: 15,
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    icon: {
        height: 24, width: 24,
        resizeMode: 'center'

    },
    input: {
        width: '70%',
        marginLeft: 10,
        color: '#000'
    },
    listView: {
        backgroundColor: '#fff',
        height: 50,
        width: '90%',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row'
    },
    title: {
        color: '#000',
        width: '70%',
        justifyContent: 'flex-start'
    },
    list: {
        alignSelf: 'center',
        width: '90%',
        marginLeft: 20
    }
})