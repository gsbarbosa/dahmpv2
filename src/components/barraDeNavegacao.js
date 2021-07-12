import React, {Component} from 'react';
import {TouchableOpacity, View, Text, BackHandler, Image} from 'react-native';
import PropTypes from 'prop-types';

export default class BarraDeNavegacao extends Component {
  static propTypes = {
    goBack: PropTypes.func,
    goMenu: PropTypes.func,
    goBackVisible: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  handleBackPress = () => {
    this._onPressBackHandle();
    return true;
  };

  _onPressBackHandle = () => {
    this.props.goBack()
  };
  _onPressMenuHandle = () => {
    this.props.goMenu()
  };

  render() {
    return (
      <View style={{width: '100%',height: 45,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
        <TouchableOpacity onPress={this._onPressMenuHandle}>
          <Image style={{resizeMode: 'cover', marginHorizontal: 4}} source={require('../assets/menu_icon.png')} />
        </TouchableOpacity>
        <Text style={{fontSize: 18}}>{this.props.title}</Text>
        {
          this.props.goBackVisible ?
          <TouchableOpacity onPress={this._onPressBackHandle}>
            <Image style={{resizeMode: 'cover', marginRight: 5}} source={require('../assets/back_icon.png')} />
          </TouchableOpacity> : <View style={{resizeMode: 'cover', marginRight: 20}} ></View>
        }
        
      </View>
    )
  }
}
