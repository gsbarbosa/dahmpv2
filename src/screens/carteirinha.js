import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import BarraDeNavegacao from '../components/barraDeNavegacao'
export default class CarteirinhaScreen extends Component {
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

  _renderAssociados = () => {
    return (
      <View>
        <Text>Em construção</Text>
      </View>
    );
  };
  _renderNaoAssociados = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 20, color: 'gray'}}>ÁREA RESTRITA PARA OS ALUNOS ASSOCIADOS AO D.A.</Text>
      </View>
    );
  };

  render() {
    goBack = () => {
      this.webview.goBack();
    };
    goMenu = () => {
      this.props.nav.openDrawer();
    };
    return (
      <>
      <BarraDeNavegacao goMenu={goMenu} goBack={goBack} goBackVisible={false} title={"Portal de Notícias"}/>
        {this.state.ativo
          ? this._renderAssociados()
          : this._renderNaoAssociados()}
      </>
    );
  }
}
