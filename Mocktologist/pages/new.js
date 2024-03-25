import { View, Text, ImageBackground, TouchableOpacity, TextInput, TouchableHighlight, Switch } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { useOverlayPopup } from '../hooks/useOverlayPopup'
import styles from '../style'
import { PopupText } from "../components";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useChoices } from '../hooks/useChoices'
import { useIsFocused } from "@react-navigation/native";

export default function New({ navigation }) {

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            setSelectedTaste('Sour')
            setVegan(vegan)
        }

    }, [isFocused])

    const { selectedTaste, setSelectedTaste, avoids, setAvoids } = useChoices()

    const { showOverlay, setShowOverlay, showPopup, setShowPopup } = useOverlayPopup();

    const { token, vegan, setVegan } = useAuth()

    const toggleVegan = () => {
        setVegan(previousValue => !previousValue);
    };

    const handleAvoidsChange = (inputText) => {
        setAvoids(inputText)
    }

    const handlePopupPress = () => {
        setShowOverlay(false)
        setShowPopup(false)
    }

    const Overlay = () => {
        return (
            <View style={styles.overlay} />
        );
    }

    const handleMix = async () => {
        navigation.navigate("Accept")
    }

    const Popup = () => {
        return (
            <View style={styles.popupBox}>
                <TouchableOpacity style={styles.popupButton} onPress={handlePopupPress}>
                    <Text style={styles.popupButtonText}>X</Text>
                </TouchableOpacity>
                <PopupText />
            </View>
        )
    }

    return (
        <ImageBackground source={require("../assets/background.png")} style={styles.background}>
            <View style={styles.container2}>
                {showOverlay && <Overlay />}
                {showPopup && <Popup />}
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}> New Drink </Text>
                </View >
                <View style={styles.ddbox}>
                    <Text style={styles.dropdownMess}> Select Taste </Text>
                    <Dropdown
                        style={styles.dropDown}
                        placeholder={selectedTaste}
                        data={[
                            { label: 'Sour', value: 'sour' },
                            { label: 'Sweet', value: 'sweet' },
                            { label: 'Salty', value: 'salty' },
                            { label: 'Minty', value: 'minty'},
                            { label: 'Herby', value: 'herby'},
                            { label: 'Fizzy', value: 'fizzy'}
                        ]}
                        labelField="label"
                        valueField="value"
                        value={selectedTaste}
                        onChange={item => setSelectedTaste(item.value)}
                        selectedTextStyle={[{ color: 'white' }, { marginLeft: '5%' }]}
                        placeholderStyle={[{ color: 'white' }, { marginLeft: '5%' }]}
                    />
                </View>
                <View style={styles.inputContainer1}>
                    <TextInput
                        style={[styles.inputDD, { textAlignVertical: 'top' }]}
                        placeholder="Anything to not include in your drink?"
                        placeholderTextColor={styles.input.placeholder.color}
                        value={avoids}
                        onChangeText={handleAvoidsChange}
                        maxLength={100}
                        multiline={true}
                    />
                </View>
                <View style={styles.row2}>
                    <Text style={styles.vegan}>Vegan:</Text>
                    <Switch
                        value={vegan}
                        onValueChange={toggleVegan}
                        thumbColor={vegan ? '#ffffff' : '#ffffff'}
                        trackColor={{ false: '#353535', true: '#ED91C8' }}
                        style={styles.toggle}
                    />
                </View>
                <TouchableHighlight style={styles.button} underlayColor="#ED91C8" onPress={handleMix}>
                    <Text style={styles.buttonText}> Let's Mix </Text>
                </TouchableHighlight>
            </View>
        </ImageBackground>
    )
}
