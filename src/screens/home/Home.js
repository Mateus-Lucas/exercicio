import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Api from '../../services/Api';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function Home(props) {
  
  const navigation = props.navigation
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    Api.get('/users')
      .then(response => {
        setUsuarios(response.data.users);
      })
      .catch(error => {
        console.log("DEU ERRO NA CHAMADA DE USUÁRIOS: ", error);
      });
  }, []);

  return (
    <View>
      <FlatList
        data={usuarios}
        renderItem={({ item }) => {
          return (
            <Card onPress={() => {
              navigation.navigate('Usuario', { id: item.id })
            }}>
              <Card.Title
                title={item.username}
                subtitle={item.email}
                left={() => <Avatar.Image size={48} source={{ uri: item.image }} />}
                right={() => <IconButton icon="chevron-right" />}
              />
            </Card>
          );
        }}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
