import {StyleSheet, Dimensions} from 'react-native';

const h = Dimensions.get('screen').height;
const w = Dimensions.get('screen').width;
const c1 = '#7687A3';
const c2 = '#485263';
const c3 = '#A4BCE4';
const c4 = '#ADC6F0';
const c5 = '#91A7C9';

export default StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  sucessText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    marginTop: 30,
    color: 'green',
  },
  notSucessText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    marginTop: 30,
    color: 'red',
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  subtitle: {
    fontWeight: 'bold',
    color: c2,
    marginBottom: 35,
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 30,
    borderRadius: 10,
  },
  logo: {
    height: 150,
    width: 150,
  },
  button: {
    backgroundColor: '#494e5a',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});
