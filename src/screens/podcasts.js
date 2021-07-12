import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import BarraDeNavegacao from '../components/barraDeNavegacao';

export default class PodcastScreen extends Component {
  static propTypes = {
    nav: PropTypes.object,
    dahmpNews: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      infoAuth: {},
      requisicaoIniciada: false,
      imageSrc: '',
      ativo: false,
      key: 1,
      isWebViewUrlChanged: false,
    };
  }

  async componentDidMount() {}

  render() {
    goBack = () => {
        try {
            this.webview.goBack();      
        } catch (error) {
            
        }
      
    };
    goMenu = () => {
      this.props.nav.openDrawer();
    };
    return (
      <>
        {this.props.dahmpNews ? (
          <>
            <BarraDeNavegacao goMenu={goMenu} goBack={goBack} goBackVisible={false} title={'DAHMP News'}/>
            <WebView source={{uri: 'https://www.dahmp.com/podcast'}} />
          </>
        ) : (
          <>
            <BarraDeNavegacao goMenu={goMenu} goBack={goBack} goBackVisible={false} title={'Causa Mortis'}/>
            <WebView source={{uri: 'https://www.dahmp.com/podcast-1'}} />
          </>
        )}
      </>
    );
  }
}
