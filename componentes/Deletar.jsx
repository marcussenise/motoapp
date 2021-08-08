import React, {useState} from 'react';
import firebase from '../firebase';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Deletar({route, navigation}){
  
   const key = route.params;
   const [ok, setOk] = useState(false);
    
    const deleteUser = async () =>{
    
    const users = firebase.db.collection('motoTaxista');
    
    await users.doc(key).delete()
    .then(
      ()=>{
          alert("deleted");
          setOk(true);
    }
    ).catch(
      ()=>alert("não foi encontrado")
    )
  }
    
    if(ok){     
        navigation.popToTop();
    }

    return(
        <View style={styles.container}>

        <View style={styles.viewLogo}>

        <Image
        style={styles.logo} 
        source={require('./cooperativa2.png')}/>

        </View>


            <Text style={styles.viewText}>Deseja excluir o Motoqueiro?</Text>
            {/**o botão abaixo aciona a função de exclusão */}
            <TouchableOpacity style={styles.btnSubmit} onPress={deleteUser}>
                <Text>Sim</Text>
            </TouchableOpacity>
            {/**o botão abaixo aciona a função de remover todos da pilha */}

            <TouchableOpacity style={styles.btnSubmit} onPress={()=>navigation.popToTop()}>
                <Text>Não</Text>
            </TouchableOpacity>
            
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
        marginTop:'15%'
    },

    viewText:{
        margin: 15,
        paddingTop: 40

    },

    btnSubmit:{
        backgroundColor: '#FF6701',
        width:'80%',
        height:'12%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        margin: 10

    },
});
