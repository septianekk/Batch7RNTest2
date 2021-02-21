import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import {InputData} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {Picker} from '@react-native-picker/picker';

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      gender: '',
      umur: '',
      status: '',
    };
  }

  componentDidMount() {
    FIREBASE.database()
      .ref('Users/' + this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let userItem = {...data};

        this.setState({
          nama: userItem.nama,
          gender: userItem.gender,
          umur: userItem.umur,
          status: userItem.status,
        });
      });
  }

  onSubmit = () => {
    if (
      this.state.nama &&
      this.state.gender &&
      this.state.umur &&
      this.state.status
    ) {
      const userRef = FIREBASE.database().ref(
        'Users/' + this.props.route.params.id,
      );

      const user = {
        nama: this.state.nama,
        gender: this.state.gender,
        umur: this.state.umur,
        status: this.state.status,
      };

      userRef
        .update(user)
        .then((data) => {
          Alert.alert('Sukses', 'USers Terupdate');
          this.props.navigation.replace('UserScreen');
        })
        .catch((error) => {
          console.log('Error : ', error);
        });
    } else {
      Alert.alert('Error', 'Nama, Nomor HP, dan Alamat wajib diisi');
    }
  };

  render() {
    return (
      <View style={styles.pages}>
        <InputData
          label="Nama"
          placeholder="Masukkan Nama"
          onChangeText={(value) => this.setState({nama: value})}
          value={this.state.nama}
        />
        <Text style={styles.textInput}>Gender: </Text>
        <Picker
          selectedValue={this.state.gender}
          style={styles.pick}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({gender: itemValue})
          }>
          <Picker.Item label="Pilih" />
          <Picker.Item label="Pria" value="pria" />
          <Picker.Item label="Wanita" value="wanita" />
        </Picker>

        <InputData
          label="Umur"
          placeholder="Masukkan Umur"
          keyboardType="number-pad"
          onChangeText={(value) => this.setState({umur: value})}
          value={this.state.umur}
        />
        <Text style={styles.textInput}>Status: </Text>
        <Picker
          selectedValue={this.state.status}
          style={styles.pick}
          onValueChange={(itemValue) => this.setState({status: itemValue})}>
          <Picker.Item label="Pilih" />
          <Picker.Item label="Single" value="single" />
          <Picker.Item label="Married" value="married" />
        </Picker>

        <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
          <Text style={styles.textTombol}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  tombol: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
