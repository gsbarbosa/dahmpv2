import React, {Component} from 'react';
import {Text, ScrollView, View, TouchableOpacity, Image, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNTextDetector from 'react-native-text-detector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './autenticacao.style';
import PropTypes from 'prop-types';
import LoadingOverlay from '../components/loadingOverlay';
import {WebView} from 'react-native-webview';
import RNPdfToImage from 'react-native-pdf-to-image';

export default class CadastroScreen extends Component {
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
      inWix: false,
      pdfSrc: '',
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

  _proximaAutenticacao = () => {
    var data = this.state.infoAuth.data.split('/');
    return (
      <Text style={styles.sucessText}>
        Autenticação válida até: {data[0]}/{parseInt(data[1]) + 1}/{data[2]}
      </Text>
    );
  };

  _loginWix = () => {
    this.setState({inWix: true});
  };

  render() {
    const onTakePhoto = () => launchCamera({mediaType: 'image'}, onMediaSelect);

    const onSelectImagePress = () => launchImageLibrary({mediaType: 'image'}, onMediaSelect);

    const onSelectPDFPress = async() => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });
        this.setState({pdfSrc: res.uri});
        var imagemConvertida = await RNPdfToImage.convert(res.uri);
        onMediaPDFSelect("file:///" + imagemConvertida.outputFiles[0])
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
          console.log(err)
        } else {
          console.log(err)
          throw err;
        }
      }      
    }

    const onMediaPDFSelect = async media => {
      this.setState({requisicaoIniciada: true});
      try {
        if (media != null) {
          this.setState({imageSrc: media});
          console.log('Extraindo texto de:', media)
          const visionResp = await RNTextDetector.detectFromUri(
            media,
          );
          media.length > 1 ? console.log("Texto extraído") : console.log("Falha ao extrair Texto")
          let taxaEncontrada = false;
          
          visionResp.forEach(el => {
            console.log(el)
            if (el.text.toUpperCase().includes('TAXA DE D.A.') || el.text.toUpperCase().includes('TAXA DE DA'))
            {
              taxaEncontrada = true;
              autenticar();
            }
          });
          if(!taxaEncontrada){
            Alert.alert("Falha na autenticação","O sistema não reconheceu o pagamento da Taxa do DA. Se o problema persistir, tente realizar a autenticação por outros meios disponíveis: PDF, GALERIA, FOTO, ou envie um email para: appdapuc@gmail.com")
            this.setState({requisicaoIniciada: false});
          }
        }
      } catch (error) {
        this.setState({requisicaoIniciada: false});
      } finally {
        this.setState({requisicaoIniciada: false});
      }
    };

    const onMediaSelect = async media => {
      this.setState({requisicaoIniciada: true});
      if (!media.didCancel) {
        this.setState({imageSrc: media.assets[0].uri});
        const visionResp = await RNTextDetector.detectFromUri(
          media.assets[0].uri,
        );
        let taxaEncontrada = false;
        visionResp.forEach(el => {
          if (el.text == 'Taxa de D.A.') {
            taxaEncontrada = true;
            autenticar();
          }
        });
        if(!taxaEncontrada){
          Alert.alert("Falha na autenticação","O sistema não reconheceu o pagamento da Taxa do DA. Se o problema persistir, enviei um email para: appdapuc@gmail.com")
          this.setState({requisicaoIniciada: false});
        }

      }
    };

    const autenticar = async () => {
      let info = { data: dataFormatada(), ativo: '1',};
      await AsyncStorage.setItem('@info_autenticacao',JSON.stringify(info),).then(() => {
        this.setState({infoAuth: info, ativo: true, requisicaoIniciada: false});
      });
    };

    const dataFormatada = () => {
      let data = new Date();
      var month = data.getMonth() + 1;
      return data.getDate() + '/' + month + '/' + data.getFullYear();
    };

    return (
      <>
        {!this.state.inWix ? (
          <ScrollView contentContainerStyle={styles.screen}>
            <LoadingOverlay
              loading={
                this.state.infoAuth.ativo != '1' &&
                this.state.requisicaoIniciada
              }
            />
            <View style={{alignItems: 'center'}}>
              <Image style={styles.logo} source={require('../assets/logo1.png')}/>
              <Text style={styles.title}>MEU DAHMP</Text>
              <Text style={styles.subtitle}>
                Diretório Acadêmico Horizontal Medicina PUC Minas
              </Text>
            </View>

            {this.state.ativo ? (
              <View>
                <Text style={styles.sucessText}>Autenticado com sucesso</Text>
                {this._proximaAutenticacao()}
                <TouchableOpacity style={styles.button} onPress={() => this._loginWix()}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.nav.navigate('Home')}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.notSucessText}>
                  Usuário(a) não Autenticado(a)
                </Text>
                <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
                  <Text style={styles.buttonText}>Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
                  <Text style={styles.buttonText}>Galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onSelectPDFPress}>
                  <Text style={styles.buttonText}>PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.nav.navigate('Home')}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        ) : (
          <WebView source={{uri: 'https://www.dahmp.com/login-associados'}}
            onNavigationStateChange={navState => { 
              console.log(navState); 
              console.log("-------------------------"); 
              if ((navState.title == 'https://www.dahmp.com/blog' || 'Blog | DAHMP') && navState.url == 'https://www.dahmp.com/blog') {
                this.setState({inWix: false});
                this.props.nav.navigate('Blog');
              }}}
          />
        )}
      </>
    );
  }
}
