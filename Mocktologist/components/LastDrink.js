import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { useAuth } from '../hooks/useAuth'
import styles from '../style'
import DrinkThumbnail from './DrinkThumbnail'
import { useIsFocused } from "@react-navigation/native";

function LastDrink() {
    const isFocused = useIsFocused()
    const { userId, token } = useAuth()
    const [hasMadeMocktail, setHasMadeMocktail] = useState(false)
    const [lastDrink, setLastDrink] = useState({})

    useEffect(() => {
        setHasMadeMocktail(false)
        setLastDrink({})
        const getLastDrink = async () => {
            if (!token) {
                return
            }
            const options = {
                method: 'GET',
                headers: {
                    Authorization: token,
                }
            }
            const response = await fetch(`https://mocktologist-backend.onrender.com/drink/all/${userId}`, options)
            console.log(response)
            if (!response.ok) {
                console.error('Cannot get drinks.')
            }
            const data = await response.json()
            if (data.length === 0) {
                return
            }
            setHasMadeMocktail(true)
            setLastDrink(data[data.length - 1])
        }
        if (isFocused) {
            getLastDrink()
        }
    }, [isFocused])

    if (!hasMadeMocktail) {
        return (
            <View style={styles.dashBox}>
                <Text style={styles.rankText}>Your most recent mocktail will show up here!</Text>
            </View>
        )
    }

    return (
        <View>
            {lastDrink && <DrinkThumbnail body={lastDrink.body} image={lastDrink.image} name={lastDrink.name} rating={lastDrink.rating} tastes={lastDrink.tastes} vegan={lastDrink.vegan} id={lastDrink.id}></DrinkThumbnail>}
        </View>
    )
}

export default LastDrink