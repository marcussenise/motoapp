import React, {useEffect, useState} from 'react';
import firebase from '../firebase';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function Atualizar({route, navigation}){
     
    const [ok,setOk] = useState(false);
    
    const key = route.params;
    
    const [state, setState] = useState({
        nomeMotorista: '',
        cpf: '',
        endereco:'',
        cnh:'',
        licenca:'',
        modeloMoto:'',
        placa:'',
        cor:'',
        renavan:'',
        status:'',
    });
    
    useEffect(
        () => navigation.addListener('focus', () => {
            
            userById(key);
        }), []
    )

    
     const userById = async (id) => {
    
    const users = firebase.db.collection('motoTaxista');
    
    const doc = await users.doc(id).get();
    
    setState(doc.data());
  }

   
    const handleInputChange = (name, value) =>{
        setState({
            ...state, [name]: value
        })
    }

    
    const editarUser = async () =>{
    
    const users = firebase.db.collection('motoTaxista');
    
    await users.doc(key).update(state).then(
      ()=>{
          alert("edited")
          
          setOk(true);
        }
    ).catch(
      ()=>alert("não foi possivel editar")
    )
  }
   
    if(ok){
        navigation.goBack();
    }

    return(
        <ScrollView>
        <View style={styles.container}>

        <View style={styles.viewLogo}>

            <Image
            style={styles.logo} 
            source={require('./cooperativa2.png')}/>

            </View>


            <Text>Editar MotoTaxista</Text>
          
            {/* <Text>{state.nome}</Text>
            <Text>{state.email}</Text> */}
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                placeholder='Nome'
                defaultValue={state.nomeMotorista}
                onChangeText={
                    (value)=>handleInputChange('nomeMotorista', value)
                }
            />
            <Text style={styles.label}>Cpf:</Text>
            <TextInput
                style={styles.input}
                placeholder='cpf'
              
                defaultValue={state.cpf}
                onChangeText={
                    (value)=>handleInputChange('cpf', value)
                }
            />

            <Text>Endereço:</Text>
            <TextInput
                style={styles.input}
                placeholder='Endereço'
              
                defaultValue={state.endereco}
                onChangeText={
                    (value)=>handleInputChange('endereco', value)
                }
            />
            <Text>Cnh:</Text>
            <TextInput
                style={styles.input}
                placeholder='Cnh'
              
                defaultValue={state.cnh}
                onChangeText={
                    (value)=>handleInputChange('cnh', value)
                }
            />
            <Text>Liçença:</Text>
            <TextInput
                style={styles.input}
                placeholder='Liçença'
              
                defaultValue={state.licenca}
                onChangeText={
                    (value)=>handleInputChange('licenca', value)
                }
            />
            <Text>Modelo da Moto:</Text>
            <TextInput
                style={styles.input}
                placeholder='Modelo da  Moto'
              
                defaultValue={state.modeloMoto}
                onChangeText={
                    (value)=>handleInputChange('modeloMoto', value)
                }
            />
            <Text>Placa:</Text>
            <TextInput
                style={styles.input}
                placeholder='Placa'
              
                defaultValue={state.placa}
                onChangeText={
                    (value)=>handleInputChange('placa', value)
                }
            />
            <Text>Revanan:</Text>
            <TextInput
                style={styles.input}
                placeholder='Revanan'
              
                defaultValue={state.renavan}
                onChangeText={
                    (value)=>handleInputChange('renavan', value)
                }
            />
            <Text>Cor:</Text>
            <TextInput
                style={styles.input}
                placeholder='Cor'
              
                defaultValue={state.cor}
                onChangeText={
                    (value)=>handleInputChange('cor', value)
                }
            />
            <Text>Status:</Text>
            <TextInput
                style={styles.input}
                placeholder='Status'
              
                defaultValue={state.status}
                onChangeText={
                    (value)=>handleInputChange('status', value)
                }
            />

        <TouchableOpacity style={styles.btnSubmit} onPress={editarUser}>
                <Text>Atualizar</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FEA82F',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical: 15

    },
    viewLogo:{
        flex:1,
    },
    logo:{
        width:300,
        height:300,
        marginTop:'15%',
        marginBottom: '2%'
    },
    viewText:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        paddingBottom:15,
    },
    input:{
        backgroundColor:'white',
        width:'90%',
        marginBottom:15,
        color:'#222',
        borderRadius:10,
        fontSize:17,
        padding:10,
    },
    btnSubmit:{
        backgroundColor: '#FF6701',
        width:'50%',
        height:'5%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        margin: 20
    },
 
//   label: {
//       fontWeight: 'bold'
//   }
});
