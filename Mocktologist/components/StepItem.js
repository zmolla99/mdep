import React from 'react'
import { Text, View } from 'react-native'
import styles from '../style'

const StepItem = ({ steps }) => {


    if (steps.length < 250) {
        return (
            <View style={styles.stepBox}>
                <Text style={styles.stepText}>{steps}</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.stepBox2}>
                <Text style={styles.stepText}>{steps}</Text>
            </View>
        )
    }
}

export default StepItem