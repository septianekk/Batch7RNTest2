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
import {InputData} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {Picker} from '@react-native-picker/picker';

import Geolocation from 'react-native-geolocation-service';

// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      gender: '',
      umur: '',
      status: '',
      // fileUri: '',
      // uri: '',
      // fileImage: '',
      // lokasi: {lat: null, lng: null},
    };
  }
  // findCoordinates = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const lokasi = JSON.stringify(position);

  //       this.setState({lokasi});
  //     },
  //     (error) => Alert.alert(error.message),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //   );
  // };

  // componentDidMount() {
  //   let geoOptions = {
  //     enableHighAccuracy: false,
  //     timOut: 2000,
  //   };
  //   this.setState({ready: false, error: null});
  //   navigator.geolocation.getCurrentPosition(
  //     this.geoSucces,
  //     this.geoFailure,
  //     geoOptions,
  //   );
  // }

  // geoSucces = (position) => {
  //   console.log(position.coords.latitude);
  //   this.setState({
  //     ready: true,
  //     where: {
  //       lat: position.coords.latitude,
  //       lg: position.coords.langitude,
  //     },
  //   });
  // };

  // geoFailure = (err) => {
  //   this.setState({error: err.message});
  // };

  // componentDidMount() {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       // this.setState({
  //       //   // lat: position.coords.latitude,
  //       //   // lng: position.coords.longitude,
  //       //   const
  //       // });
  //       const lokasi = JSON.stringify(position);
  //       this.setState({lokasi});
  //       console.log(
  //         'posiiton',
  //         position,
  //         'latitdue',
  //         this.state.lng,
  //         this.state.lat,
  //       );
  //     },
  //     (error) => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // }

  // locationCurrent = () => {
  //   console.log(this.state.lokasi);
  //   this.setState({lokasi: `${this.state.lng}, ${this.state.lat}`});
  // };

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

  // onUploadPhotoHandler = () => {
  //   const optionsImage = {
  //     mediaType: 'photo',
  //     includeBase64: true,
  //     quality: 0.5,
  //     maxWidth: 200,
  //     maxHeight: 200,
  //   };
  //   launchCamera(optionsImage, (response) => {
  //     if (response.didCancel) {
  //       showMessage({
  //         message: 'cancel',
  //         type: 'danger',
  //       });
  //     } else {
  //       console.log(response);
  //       // const source = {uri: response.uri};
  //       this.setState({fileUri: response.uri});
  //     }
  //   });
  // };

  // takePhoto = () => {
  //   const options = {
  //     storageOptions: {
  //       skipBackup: false,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchCamera(options, (response) => {
  //     console.log('ressponse', response);
  //     if (response.didCancel) {
  //       console.log('user cancelled image picker');
  //     } else if (response.err) {
  //       console.log('Image picker error', response.err);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button', response.customButto);
  //     } else {
  //       const source = {uri: response.uri};
  //       this.setState({fileUri: source});
  //       console.log(source);
  //     }
  //   });
  // };

  // captureImage = (type) => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //     videoQuality: 'low',
  //     durationLimit: 30, //Video max duration in seconds
  //     saveToPhotos: true,
  //   };
  //   launchCamera(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       alert('User cancelled camera picker');
  //       return;
  //     } else if (response.errorCode === 'camera_unavailable') {
  //       alert('Camera not available on device');
  //       return;
  //     } else if (response.errorCode === 'permission') {
  //       alert('Permission not satisfied');
  //       return;
  //     } else if (response.errorCode === 'others') {
  //       alert(response.errorMessage);
  //       return;
  //     }
  //     console.log('base64 -> ', response.base64);
  //     console.log('uri -> ', response.uri);
  //     console.log('width -> ', response.width);
  //     console.log('height -> ', response.height);
  //     console.log('fileSize -> ', response.fileSize);
  //     console.log('type -> ', response.type);
  //     console.log('fileName -> ', response.fileName);
  //     // const source = {uri: response.uri};
  //     this.setState({fileUri: {uri: response.uri}});
  //     // this.setState({uri: response.uri});
  //     // this.setState({fileImage: response});
  //   });
  // };

  // chooseFile = (type) => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //   };
  //   launchImageLibrary(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       alert('User cancelled camera picker');
  //       return;
  //     } else if (response.errorCode === 'camera_unavailable') {
  //       alert('Camera not available on device');
  //       return;
  //     } else if (response.errorCode === 'permission') {
  //       alert('Permission not satisfied');
  //       return;
  //     } else if (response.errorCode === 'others') {
  //       alert(response.errorMessage);
  //       return;
  //     }
  //     console.log('base64 -> ', response.base64);
  //     console.log('uri -> ', response.uri);
  //     console.log('width -> ', response.width);
  //     console.log('height -> ', response.height);
  //     console.log('fileSize -> ', response.fileSize);
  //     console.log('type -> ', response.type);

  //     this.setState({fileUri: {uri: response.uri}});
  //   });
  // };

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
            {!this.state.ready && (
              <Text style={styles.big}>Using Geolocation in React Native.</Text>
            )}
            {this.state.error && (
              <Text style={styles.big}>Error: {this.state.error}</Text>
            )}
            {this.state.ready && (
              <Text style={styles.big}>
                Latitude: {this.state.where.lat}
                Longitude: {this.state.where.lng}
              </Text>
            )} */}
          {/* <Text style={styles.label}>
              Latitude:{this.state.where.lat} Longitude:{this.state.where.lng}{' '}
            </Text> */}
          {/* <TextInput
              onChangeText={(value) => this.setState({lokasi: value})}
              value={this.state.lokasi}
              style={styles.input}
              placeholder="Lokasi"
            />
            <TouchableOpacity
              onPress={this.findCoordinates}
              style={styles.tombolGeo}>
              <Text style={styles.textGeo}>Dapatkan Lokasi</Text>
            </TouchableOpacity> */}
          {/* </View> */}

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
});
