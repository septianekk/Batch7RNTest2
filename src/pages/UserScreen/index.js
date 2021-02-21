import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import FIREBASE from '../../config/FIREBASE';
import CardUser from '../../components/CardUser';

export default class UserScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {},
      usersKey: [],
    };
  }

  componentDidMount() {
    this.ambilData();
  }

  ambilData = () => {
    FIREBASE.database()
      .ref('Users')
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let userItem = {...data};

        this.setState({
          users: userItem,
          usersKey: Object.keys(userItem),
        });
      });
  };

  // removeData = (id) => {
  //   Alert.alert(
  //     'Info',
  //     'Anda yakin akan menghapus Data Kontak ?',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           FIREBASE.database()
  //             .ref('Kontak/' + id)
  //             .remove();
  //           this.ambilData();
  //           Alert.alert('Hapus', 'Sukses Hapus Data');
  //         },
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };

  render() {
    const {users, usersKey} = this.state;

    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{`${usersKey.length} User`}</Text>
          <TouchableOpacity
            style={styles.btnTambah}
            onPress={() => this.props.navigation.navigate('AddUser')}>
            <Text style={styles.appButtonText}>Tambah</Text>
          </TouchableOpacity>
          <View style={styles.garis} />
        </View>

        <View style={styles.listUser}>
          {usersKey.length > 0 ? (
            usersKey.map((key) => (
              <CardUser
                key={key}
                userItem={users[key]}
                id={key}
                {...this.props}
              />
            ))
          ) : (
            <Text>Daftar Kosong</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  garis: {
    borderWidth: 1,
    marginTop: 10,
  },
  listUser: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnTambah: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
