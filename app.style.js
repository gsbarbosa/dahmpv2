import {StyleSheet, Dimensions} from 'react-native';

const h = Dimensions.get('screen').height;
const w = Dimensions.get('screen').width;
const c1 = '#7687A3';
const c2 = '#485263';
const c3 = '#A4BCE4';
const c4 = '#ADC6F0';
const c5 = '#91A7C9';

export default StyleSheet.create({
  drawer: {
    fontSize: 35,
    marginVertical: 40,
  }, 
  logo: {
    height: 150,
    width: 150,
  },
});
