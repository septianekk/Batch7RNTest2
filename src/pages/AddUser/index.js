import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {InputData} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {Picker} from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service';
// import Geo from '../Geo';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      gender: '',
      umur: '',
      status: '',
      fileUri: '',
      uri:
        'https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Image-01-512.png',

      location: '',
      lat: '',
      lng: '',
    };
  }

  componentDidMount() {
    if (this.hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (info) => {
          const {coords} = info;
          console.log(coords.latitude);
          console.log(coords.longitude);
          this.setState({location: coords.latitude + ', ' + coords.longitude});
          // this.setState({ location: response.uri })
        },

        (error) => console.log(error),
        {
          enableHighAccuracy: false,
          timeout: 2000,
          maximumAge: 3600000,
        },
      );
    }
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  onSubmit = () => {
    if (
      this.state.nama &&
      this.state.gender &&
      this.state.umur &&
      this.state.status
      // this.state.fileUri
    ) {
      const userRef = FIREBASE.database().ref('Users');
      const user = {
        nama: this.state.nama,
        gender: this.state.gender,
        umur: this.state.umur,
        status: this.state.status,
        location: this.state.location,
        uri: this.state.uri,
        // fileUri: this.state.fileUri,
        // lokasi: this.state.lokasi,
      };

      userRef
        .push(user)
        .then((data) => {
          Alert.alert('Sukses', 'User Tersimpan');
          this.props.navigation.replace('UserScreen');
        })
        .catch((error) => {
          console.log('Error : ', error);
        });
    } else {
      Alert.alert('Error', 'Nama, Nomor HP, dan Alamat wajib diisi');
    }
  };

  // pickImageHandler = () => {
  //   ImagePicker.showImagePicker(
  //     {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
  //     (response) => {
  //       if (response.error) {
  //         console.log('image error');
  //       } else {
  //         console.log('Image: ' + response.uri);
  //         const source = {uri: response.uri};
  //         this.setState({fileUri: source});
  //       }
  //     },
  //   );
  // };

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
        <ScrollView>
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

          {/* <View style={styles.container}>
            <View style={{borderWidth: 2, borderColor: 'black'}}>
              <Image source={{uri: this.state.uri}} style={styles.imageStyle} />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={() => this.captureImage('photo')}>
              <Text style={styles.textStyle}>Launch Camera for Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={() => this.chooseFile('photo')}>
              <Text style={styles.textStyle}>Choose Image</Text>
            </TouchableOpacity>
          </View> */}

          {/* <View>
         
          {/* <Text style={styles.label}>
              Latitude:{this.state.where.lat} Longitude:{this.state.where.lng}{' '}
            </Text> */}
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

          <TouchableOpacity
            style={styles.tombol}
            onPress={() => this.onSubmit()}>
            <Text style={styles.textTombol}>SUBMIT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

hasLocationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

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
  imgContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  img: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  tombolGeo: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  textGeo: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
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
