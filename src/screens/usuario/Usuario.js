import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Card, IconButton } from 'react-native-paper';
import Api from '../../services/Api';

export default function Usuario(props) {
  
  const navigation = props.navigation
  const [usuario, setUsuario] = useState()
  const usuarioId = props.route.params.id

  useEffect(() => {
    Api.get('/users/' + usuarioId)
      .then(response => {
        setUsuario(response.data);
      })
      .catch(error => {
        console.log("DEU ERRO NA CHAMADA DE USUÁRIOS: ", error);
      });
  }, []);

  return (
    <View>
      <Card onPress={() => {
        navigation.navigate('Post', { id: usuario.id })
      }}>
        <Card.Title
          title={usuario?.username}
          subtitle={usuario?.email}
          left={() => <Avatar.Image size={48} source={{ uri: usuario?.image }} />}
          right={() => <IconButton icon="chevron-right" />}
        />
        <Card.Cover source={{ uri: usuario?.image }} />
        <Card.Content>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text variant="titleLarge">Nome:</Text>
            <Text variant="titleLarge">{usuario?.firsName}{usuario?.lastName}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text variant="titleLarge">Sobrenome:</Text>
            <Text variant="titleLarge">{usuario?.firsName}{usuario?.maidenName}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text variant="titleLarge">Email:</Text>
            <Text variant="titleLarge">{usuario?.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text variant="titleLarge">Idade:</Text>
            <Text variant="titleLarge">{usuario?.age}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text variant="titleLarge">Telefone:</Text>
            <Text variant="titleLarge">{usuario?.phone}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}
