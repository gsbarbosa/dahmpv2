import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import BarraDeNavegacao from '../components/barraDeNavegacao'

export default class BlogScreen extends Component {
  
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
      key: 1,
      isWebViewUrlChanged: false
    };
  }

  async componentDidMount() {
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
        <BarraDeNavegacao goMenu={goMenu} goBack={goBack} goBackVisible={true} title={"Portal de Notícias"}/>
        <WebView ref={r => this.webview = r} source={{uri: 'https://www.dahmp.com/blog'}}
          // onNavigationStateChange={this.setWebViewUrlChanged()}
        />
      </>
    );
  }
}
