import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FIREBASE from '../../config/FIREBASE';

export default class DetailUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    FIREBASE.database()
      .ref('Users/' + this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let userItem = {...data};

        this.setState({
          user: userItem,
        });
      });
  }

  render() {
    const {user} = this.state;
    return (
      <View style={styles.pages}>
        <Text>Nama : </Text>
        <Text style={styles.text}>{user.nama} </Text>

        <Text>Gender : </Text>
        <Text style={styles.text}>{user.gender} </Text>

        <Text>Umur : </Text>
        <Text style={styles.text}>{user.umur} Tahun </Text>
        <Text>Status : </Text>
        <Text style={styles.text}>{user.status} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    margin: 30,
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
