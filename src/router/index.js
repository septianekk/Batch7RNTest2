import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {UserScreen, AddUser, DetailUser, EditUser} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{title: 'Tambah User'}}
      />
      <Stack.Screen
        name="DetailUser"
        component={DetailUser}
        options={{title: 'Detail User'}}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{title: 'Edit User'}}
      />
      {/* <Stack.Screen name="Geo" component={Geo} options={{title: 'Edit User'}} /> */}
    </Stack.Navigator>
  );
};

export default Router;
