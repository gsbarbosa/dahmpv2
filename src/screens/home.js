import React, {Component} from 'react';
import {Text, ScrollView, View, TouchableOpacity, Image} from 'react-native';
import styles from './home.style';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

const c2 = '#485263';

export default class HomeScreen extends Component {
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
      inWix: false,
    };
  }

  async componentDidMount() {}

  render() {
    return (
      <>
        {!this.state.inWix ? (
          <ScrollView contentContainerStyle={styles.screen}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={styles.logo}
                source={require('../assets/logo1.png')}
              />
              <Text style={styles.title}>MEU DAHMP</Text>
              <Text style={styles.subtitle}>
                Diretório Acadêmico Horizontal Medicina PUC Minas
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.nav.navigate('Autenticacao')}>
                <Text style={styles.buttonText}>Sou associado</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.setState({inWix: true})}>
                <Text style={styles.buttonText}>Não sou associado</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <WebView  
          source={{ uri: 'https://www.dahmp.com/login' }}
          onNavigationStateChange={(navState) => {
          console.log(navState)
          console.log("-------------------------"); 
          if((navState.title=="https://www.dahmp.com/blog" || "Blog | DAHMP") && navState.url=="https://www.dahmp.com/blog"){
            this.setState({inWix: false})
            this.props.nav.navigate("Blog")
          }
        }}
        />
        )}
      </>
    );
  }
}
