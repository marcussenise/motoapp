import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, Image } from 'react-native';
import UserView from './UserView';



export default function Navegacao({navigation}) {

    const tchau = () =>{
        navigation.popToTop()
    }

    return(

            <View style={styles.container}>
           
            <View style={styles.viewLogo}>
            
            <Image
            
            style={styles.logo} 
            source={require('./cooperativa2.png')}/>

            </View>


            <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('Cadastro')}>
                <Text style={styles.textSubmit}>Cadastrar Mototáxi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('ListaMotorista')}>
                <Text style={styles.textSubmit}>Lista de Motorista</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('ListaCorrida')}>
                <Text style={styles.textSubmit}>Corridas</Text>
            </TouchableOpacity>

            <UserView tchau={tchau}/>

       

{/* <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>Press Here</Text>
      </TouchableOpacity> */}

{/* 
            {/* <Button title='Cadastrar' color='#FF6701' width= '100%'
                onPress={()=> cadastro()}
            />
            <Button title='Deletar' color='#FF6701'
                onPress={()=> navigation.navigate('Deletar')}
            />
            <Button title='Atualizar'  color='#FF6701'
                onPress={()=> navigation.navigate('Atualizar')}
            />
            <Button title='Lista de Motorista' color='#FF6701'
                onPress={()=> navigation.navigate('ListaMotorista')}
            /> */}
       </View>

    ) 
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FEA82F',
        alignItems:'center',
        justifyContent:'center',

    },
    viewLogo:{
        flex:1,
    },
    logo:{
        width:300,
        height:300,
        marginTop:-60,
    },

    btnSubmit:{
        backgroundColor: '#FF6701',
        width:'50%',
        height:'10%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        margin: 25,
    color: "white",
    },
    
    textSubmit:{
        color:'white',
        fontSize:18,
        fontWeight: 'bold'
    },
    
})