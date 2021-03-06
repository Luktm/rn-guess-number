import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import TitleText from './TitleText';
import Colors from '../constants/colors';

const Header = props => {
    return (
        <View style={{ 
                ...styles.headerBase, 
                ...Platform.select({ 
                    ios: styles.headerIOS, 
                    android: styles.headerANDROID 
                    }) 
                }}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    )

}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1.
    },
    headerANDROID: {
        backgroundColor: Colors.primary,
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold',
    },
    title: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white'
    }
});

export default Header;