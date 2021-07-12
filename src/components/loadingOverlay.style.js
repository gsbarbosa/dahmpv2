import { StyleSheet, Dimensions } from 'react-native'

export default styles = StyleSheet.create({
    view: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: 'black',
        opacity: 0.8,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 1000
    },
    spinner: {
        color: 'white'
    }
})