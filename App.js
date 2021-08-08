import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler';
import Cadastro from './componentes/Cadastro';
import Deletar from './componentes/Deletar';
import Atualizar from './componentes/Atualizar';
import Login from './componentes/Login';
import Navegacao from './componentes/Navegacao';
import ListaMotorista from './componentes/ListaMotorista' ;
// import userView from './userView';
import { UserContext } from './componentes/UserContext';
import UserView from './componentes/UserView';
import ListaCorrida from './componentes/ListaCorrida';



const Stack = createStackNavigator();


  export default function App() {

    const [isLogged, setIsLogged] = useState (false);
    const [user, setUser] = useState(null);
  
    const logado = (u) => {
      setIsLogged(true); 
      setUser(u); 
    }
  
    const deslogado = () => {
      setIsLogged(false);
      setUser(null);
    }
   

  return (

    <NavigationContainer >

      <StatusBar style="auto" />

    
    <UserContext.Provider value={{user, logado, deslogado}}> 

    {/* { isLogged ? <Navegacao/> : <Login />} */}

        <Stack.Navigator initialRouteName='Login'>
           <Stack.Screen name='Login' component={Login}/>
           <Stack.Screen name='ListaMotorista' component={ListaMotorista}/>
           <Stack.Screen name='Navegacao' component={Navegacao}/>
           <Stack.Screen name='Cadastro' component={Cadastro}/> 
           <Stack.Screen name='Atualizar' component={Atualizar}/>
           <Stack.Screen name='Deletar' component={Deletar}/>
           <Stack.Screen name='UserView' component={UserView}/>
           <Stack.Screen name='ListaCorrida' component={ListaCorrida}/>
        </Stack.Navigator>

        </UserContext.Provider>
    </NavigationContainer>

  );
}