import React from 'react'
import { View, Text } from 'react-native'
import styles from '../style'

function PopupText() {
    return (
        <View style={[styles.container2, { top: 10 }]}>
            <Text style={styles.heading}>Welcome to Mocktology!</Text>
            <Text style={[styles.landingPageText2, {fontSize: 20}]}>Your all-in-one app to get creative and make some delicious mocktails.</Text>
            <Text style={[styles.landingPageText2, {fontSize: 20}]}>Choose your preferences and our bartender will deliver a delicious recipe straight to your phone.</Text>
            <Text style={[styles.landingPageText2, {fontSize: 20}]}>If you want to show off, you can share your top mixes with your friends using a QR code. Happy creating!</Text>
            <Text style={[styles.landingPageText2, {fontSize: 20}]}>With love: Tom, Zeph, Henrie, Jess, Jelly, Cem ❤️</Text>
        </View>
    )
}

export default PopupText