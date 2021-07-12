import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import BarraDeNavegacao from '../components/barraDeNavegacao';

export default class BlogScreen extends Component {
  static navigationOptions = {
    drawerLabel: () => null,
    drawerIcon: () => null,
  };

  static propTypes = {
    nav: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      infoAuth: {},
      requisicaoIniciada: false,
      imageSrc: '',
      ativo: false,
    };
  }

  async componentDidMount() {
    let autenticacaoJson = '';
    try {
      autenticacaoJson = await AsyncStorage.getItem('@info_autenticacao');
      if (autenticacaoJson != null) {
        this.setState({infoAuth: JSON.parse(autenticacaoJson), ativo: true});
      }
    } catch (error) {}
  }

  render() {
    goBack = () => {
      this.webview.goBack();
    };
    goMenu = () => {
      this.props.nav.openDrawer();
    };

    return (
      <>
      <BarraDeNavegacao goMenu={goMenu} goBack={goBack} goBackVisible={true} title={"Formulários"}/>
        {this.state.ativo ? (
          <WebView ref={r => this.webview = r} source={{uri: 'https://www.dahmp.com/form-associado'}} />
        ) : (
          <WebView ref={r => this.webview = r} source={{uri: 'https://www.dahmp.com/formularios'}} />
        )}
      </>
    );
  }
}
