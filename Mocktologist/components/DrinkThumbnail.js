import React, { useState } from 'react'
import { Text, Image, View, Touchable, TouchableHighlight, Modal } from 'react-native'
import { useOverlayPopup } from '../hooks/useOverlayPopup'
import styles from '../style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useChoices } from '../hooks/useChoices'

function DrinkThumbnail({ index, type, body, image, name, rating, tastes, vegan, id }) {

  const { showOverlay, setShowOverlay } = useOverlayPopup()
  const { viewId, setViewId } = useChoices()

  const navigation = useNavigation()

  const [showDetails, setShowDetails] = useState(false)

  const handleThumbnailPress = () => {
    if (type != 'current') {
      setShowDetails(true)
      setShowOverlay(true)
    }
  }

  const handleThumbnailClose = () => {
    if (type != 'current') {
      setShowDetails(false)
      setShowOverlay(false)
    }
  }

  const handleRecipe = () => {
    setShowDetails(false)
    setShowOverlay(false)
    setViewId(id)
    navigation.navigate("Recipe")
  }

  const Details = () => (
    <Modal
      visible={showDetails}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowDetails(false)}
    >
      <View style={[styles.popupBox, { left: 30 }]}>
        <TouchableHighlight underlayColor="transparent" style={{ left: 140 }} onPress={() => handleThumbnailClose()}>
          <Text style={styles.popupButtonText}>X</Text>
        </TouchableHighlight>
        <Text style={styles.heading}>{name} <Text style={{ color: '#A9ED91' }}>{vegan ? 'v' : ''}</Text></Text>
        <Image style={styles.detailsImage} source={{ uri: image }}></Image>
        <Text style={[styles.heading, { marginBottom: 25, fontSize: 24 }]}>Rating: {rating}/10</Text>
        <Text style={[styles.heading, { marginBottom: 25, fontSize: 24 }]}>Taste Profile: {tastes}</Text>
        <TouchableHighlight style={styles.button} onPress={handleRecipe}>
          <Text style={styles.buttonText}>Recipe</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  )


  return (
    <View>
      {showDetails && <Details />}
      <TouchableOpacity style={[styles.dashBox, { width: type === 'ranking' || type === 'current' ? 350 : 190, height: type === 'current' ? 300 : 185 }]} onPress={() => handleThumbnailPress()}>
        <Text style={[styles.heading, { fontSize: 18, marginTop: 0, marginBottom: 10 }]}>{type === 'ranking' && index + 1 + '.'} {name} <Text style={{ color: '#A9ED91' }}>{vegan ? 'v' : ''}</Text></Text>
        <View>
          {type !== 'current' && <Image source={{ uri: image }} style={[styles.drinkThumbnailImage, { width: type === 'ranking' || type === 'current' ? 300 : 150 }]} />}
          {type === 'current' && <Image style={[styles.bartenderCurrent, { bottom: -10 }]} source={require('../assets/bartender.png')} />}
        </View>
        {type === 'current' && <TouchableHighlight style={styles.button} onPress={() => navigation.navigate("Steps")}>
          <Text style={styles.buttonText}>Recipe</Text>
        </TouchableHighlight>}
      </TouchableOpacity>
    </View>
  )
}

export default DrinkThumbnail