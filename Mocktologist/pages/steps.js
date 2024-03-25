import { View, Text, ImageBackground, TouchableOpacity, FlatList, TouchableHighlight } from "react-native";
import { useOverlayPopup } from '../hooks/useOverlayPopup'
import styles from '../style'
import { PopupText } from "../components";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import StepItem from "../components/StepItem";

export default function Steps({ navigation }) {

    const isFocused = useIsFocused()

    const { userId, token } = useAuth()

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [id, setId] = useState(0)

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
                    const response = await fetch(`https://mocktologist-backend.onrender.com/drink/current/${userId}`, options)
                    if (response.ok) {
                        const data = await response.json()
                        setName(data.name)
                        setId(data.id)
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
    const [quitting, setQuitting] = useState(false)
    const [completing, setCompleting] = useState(false)

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
                </TouchableOpacity><Text style={styles.heading}>Ingredients</Text>
                <View style={[{ justifyContent: 'center' }, { height: '70%' }]}>
                    {ingredients.map((ingredient, index) => (
                        <Text style={styles.ingredientsList} key={index}>{ingredient}</Text>
                    ))}
                </View>
            </View>
        )
    }

    const ConfQuit = () => {
        return (
            <View style={styles.popupBoxConf}>
                <Text style={styles.headingConf}>Are you sure you want to quit?</Text>
                <Text style={styles.confMess}>You will lose this recipe...</Text>
                <View style={styles.options}>
                    <TouchableHighlight style={styles.buttonOp} underlayColor="#ED91C8" onPress={() => (setQuitting(false), setShowOverlay(false))}>
                        <Text style={styles.buttonText}>No</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.buttonOp} underlayColor="#ED91C8" onPress={handleQuit}>
                        <Text style={styles.buttonText}> Yes</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    const ConfComplete = () => {
        return (
            <View style={styles.popupBoxConf}>
                <Text style={styles.headingConf}>Are you sure you are done?</Text>
                <Text style={styles.confMess}>There's no going back...</Text>
                <View style={styles.options}>
                    <TouchableHighlight style={styles.buttonOp} underlayColor="#ED91C8" onPress={() => (setCompleting(false), setShowOverlay(false))}>
                        <Text style={styles.buttonText}>No</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.buttonOp} underlayColor="#ED91C8" onPress={handleComplete}>
                        <Text style={styles.buttonText}> Yes</Text>
                    </TouchableHighlight>
                </View>
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

    const handleQuit = async () => {
        setShowOverlay(false)
        setQuitting(false)
        try {
            const options = {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                }
            }
            const response = await fetch(`https://mocktologist-backend.onrender.com/drink/${id}`, options)
            if (response.ok) {
                navigation.navigate("Dashboard")
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleComplete = () => {
        setShowOverlay(false)
        setCompleting(false)
        navigation.navigate("Complete")
    }

    return (
        <ImageBackground source={require("../assets/background.png")} style={styles.background}>
            <View style={styles.container}>
                {showOverlay && <Overlay />}
                {showPopup && <Popup />}
                {showPopupIng && <PopupIng />}
                {quitting && <ConfQuit />}
                {completing && <ConfComplete />}
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
                <TouchableHighlight style={styles.buttonST} underlayColor="#ED91C8" onPress={() => (setShowOverlay(true), setQuitting(true))}>
                    <Text style={styles.buttonText}> Quit Mix</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonSTC} underlayColor="#ED91C8" onPress={() => (setShowOverlay(true), setCompleting(true))}>
                    <Text style={styles.buttonText}> Complete</Text>
                </TouchableHighlight>
            </View>
        </ImageBackground>
    );
}