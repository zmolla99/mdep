import { View, Text, ImageBackground, TouchableOpacity, FlatList, TouchableHighlight } from "react-native";
import { useOverlayPopup } from '../hooks/useOverlayPopup'
import styles from '../style'
import { PopupText } from "../components";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import StepItem from "../components/StepItem";
import { useChoices } from "../hooks/useChoices";

export default function Recipe() {

    const isFocused = useIsFocused()

    const { token } = useAuth()
    const { viewId } = useChoices()

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        if (isFocused) {
            const getDrink = async () => {
                try {
                    const options = {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: token,
                        }
                    }
                    const response = await fetch(`https://mocktologist-backend.onrender.com/drink/${viewId}`, options)
                    if (response.ok) {
                        const data = await response.json()
                        setName(data.name)
                        const i = data.body.findIndex(e => e == "Ingredients required:") + 1
                        const j = data.body.findIndex(e => e == "Instructions:")
                        setIngredients(data.body.slice(i, j))
                        const k = data.body.findIndex(e => e == "Nutritional Info: ")
                        setSteps(data.body.slice(j + 1, k))
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            getDrink()
        }
    }, [isFocused])

    const { showOverlay, setShowOverlay, showPopup, setShowPopup } = useOverlayPopup();
    const [showPopupIng, setShowPopupIng] = useState(false)

    const handlePopupPress = () => {
        setShowOverlay(false)
        setShowPopup(false)
        setShowPopupIng(false)
    }

    const Overlay = () => {
        return (
            <View style={styles.overlay} />
        );
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

    const PopupIng = () => {
        return (
            <View style={styles.popupBox}>
                <TouchableOpacity style={styles.popupButton} onPress={handlePopupPress}>
                    <Text style={styles.popupButtonText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.heading}>Ingredients</Text>
                {ingredients.map((ingredient, index) => (
                    <Text style={styles.landingPageText2} key={index}>{ingredient}</Text>
                ))}
            </View>
        )
    }


    const renderSteps = ({ item }) => {
        return (
            <StepItem steps={item} />
        )
    }

    const handleIng = () => {
        setShowPopupIng(true)
        setShowOverlay(true)
    }

    return (
        <ImageBackground source={require("../assets/background.png")} style={styles.background}>
            <View style={styles.container}>
                {showOverlay && <Overlay />}
                {showPopup && <Popup />}
                {showPopupIng && <PopupIng />}
                <Text style={styles.heading2}> {name} </Text>
                <TouchableHighlight style={styles.buttonIng} underlayColor="#ED91C8" onPress={handleIng}>
                    <Text style={styles.buttonText}> Ingredients</Text>
                </TouchableHighlight>
                <FlatList
                    style={styles.FlatList}
                    data={steps}
                    renderItem={renderSteps}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    contentContainerStyle={{ marginBottom: 20 }}
                />
            </View>
        </ImageBackground>
    );
}