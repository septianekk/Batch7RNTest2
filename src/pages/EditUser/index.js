import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
  Image,
  Button,
} from 'react-native';
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
      location: '',
      image: '',
      fileUri: '',
      uri: '',
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
          location: userItem.location,
          uri: userItem.uri,
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
        location: this.state.location,
        uri: this.state.uri,
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

  requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        // If Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        this.captureCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  captureCamera = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log('data urinya ' + response);
        this.setState({uri: response.uri});
        this.setState({fileUri: response});
      },
    );
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

        <View>
          <Text style={{marginBottom: 5}}>Lokasi</Text>
          <TextInput
            onChangeText={(value) => this.setState({location: value})}
            value={this.state.location}
            style={styles.input}
            placeholder="Lokasi"
          />
          {/* <TouchableOpacity
              onPress={() => this.locationCurrent()}
              style={styles.tombolGeo}>
              <Text style={styles.textGeo}>Dapatkan Lokasi</Text>
            </TouchableOpacity> */}
          {/* <Geo /> */}
        </View>

        <View style={styles.image}>
          <Image
            style={styles.cameraContainer}
            source={{uri: this.state.uri}}
          />
        </View>
        <Button
          title="Take image"
          onPress={() => {
            if (this.requestPermission()) {
              this.captureCamera();
            }
          }}
          style={styles.Button}
        />

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
    backgroundColor: '#009688',

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
  cameraContainer: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  image: {
    marginBottom: 10,
  },
});
