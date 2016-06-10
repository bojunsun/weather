/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView
} from 'react-native';

//var Api = require('./src/api');
import Api from './src/api';

class weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: {longitude: 0, latitude: 0},
      city: '',
      temperature: '',
      description: ''
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  render() {
    return (
      <MapView
        annotations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete} 
        style={styles.map}>
      </MapView>
    );
  }

  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        console.log(data);
        this.setState(data);
      });
  }

}

var styles = StyleSheet.create({
  map: {
    flex: 1
  }
});


AppRegistry.registerComponent('weather', () => weather);
