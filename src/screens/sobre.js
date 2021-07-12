import React, {Component} from 'react';
import {Text, ScrollView, View, Image} from 'react-native';
import styles from './sobre.style';
import PropTypes from 'prop-types';
import BarraDeNavegacao from '../components/barraDeNavegacao'
export default class SobreScreen extends Component {
  static navigationOptions = {
    drawerLabel: () => null,
    drawerIcon: () => null,
  };

  static propTypes = {
    nav: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    goBack = () => {
      try {
          this.webview.goBack();      
      } catch (error) {}
    };
    goMenu = () => {
      this.props.nav.openDrawer();
    };
    return (
      <ScrollView>
          <BarraDeNavegacao goMenu={goMenu} goBack={goBack} goBackVisible={false} title={'Sobre'}/>
          {/* <Text style={styles.title}>IDEALIZADORES</Text> */}
        <Image style={styles.idealizadores} source={require('../assets/membros.png')} />
      </ScrollView>
    );
  }
}
