import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import { UserContext } from './UserContext';
import firebase from '../firebase';

export default function UserView({tchau}){

    const {user, deslogado} = useContext(UserContext);
    const[userView, setUserView] = useState(false);
    
    const logout = async () => {
        const auth = firebase.auth;
        await auth.signOut();
        tchau()
        //navigation.popToTop();
        // deslogado();

    }

    if(userView){
        return(
            <View style={styles.container}>
              
                <Text style={styles.txt}>Usuário {user.email}</Text>
                <TouchableOpacity style={styles.btnSubmit} onPress={{logout}}>
                <Text style={styles.txt}>Logout</Text>
                </TouchableOpacity>
                <Text onPress={() => setUserView(false)} style={styles.txt}>Ocultar</Text>
            </View>
        )
    }else{
        return(
            <View>
                <Text onPress={() => setUserView(true)} style={styles.txt}>Ver Usuário</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnSubmit:{
        backgroundColor: '#FF6701',
        width: 100,
        height: '40%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        margin: 10,
    },

    txt:{
        color: "white",
        fontWeight: '600',
    },

    container:{
        flex:1,
        backgroundColor:'#FEA82F',
        alignItems:'center',
        justifyContent:'center',
    },
})