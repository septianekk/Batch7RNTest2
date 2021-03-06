import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const CardUser = ({id, userItem, navigation, removeData}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('DetailUser', {id: id})}>
      <View>
        <Image source={{uri: userItem.uri}} style={styles.img} />
        <Text style={styles.nama}>Nama: {userItem.nama}</Text>
        <Text>Gender: {userItem.gender}</Text>
        <Text>Umur: {userItem.umur} tahun</Text>
        <Text>Status: {userItem.status}</Text>
        <Text>Location: {userItem.location}</Text>
      </View>
      <View style={styles.icon}>
        <FontAwesomeIcon
          icon={faEdit}
          color={'orange'}
          size={50}
          onPress={() => navigation.navigate('EditUser', {id: id})}
        />
        {/* <FontAwesomeIcon
          icon={faTimes}
          color={'red'}
          size={25}
          onPress={() => removeData(id)}
        /> */}
      </View>
    </TouchableOpacity>
  );
};

export default CardUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  nama: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  noHP: {
    fontSize: 12,
    color: 'gray',
  },
  icon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  img: {
    marginRight: 100,
    marginBottom: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
