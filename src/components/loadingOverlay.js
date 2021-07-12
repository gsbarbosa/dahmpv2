import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import PropTypes from 'prop-types';

import styles from './loadingOverlay.style';

export default class LoadingOverlay extends Component {
  static propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    animating: PropTypes.bool,
    Loading: PropTypes.bool,
  };

  static defaultProps = {
    size: 'large',
    color: '#FFF',
    animating: true,
    Loading: false,
  };

  constructor(props) {
    super(props);
  }
  render() {
    return this.props.loading ? (
      <View style={styles.view}>
        <View>
          <ActivityIndicator size={this.props.size} color={this.props.color}
            animating={this.props.animating} hidesWhenStopped={false} />
        </View>
      </View>
    ) : null;
  }
}
