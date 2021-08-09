import React, {useState} from 'react';
import firebase from '../firebase';
import { StyleSheet, TextInput, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function Cadastro({navigation}){

    const [newUser, setNewUser] = useState(false)
     
    const [ok, setOk] = useState(false);
     
    const [state, setState] = useState({
        nomeMotorista: '',
        email: '',
        cnh:'',
        renavan:'',
        cor:'',
        status:'',
        modeloMoto:'',
        cpf:'',
        endereco:'',
        licenca:'',
        placa:'',
        senha:'',
        key: ''
    });

    
    const handleInputChange = (name, value) =>{
        setState({
            ...state, [name]: value
        })
    }

    

    const addMotoqueiro = async () =>{
        const auth = firebase.auth;
        const {email, senha} = state;
        if(senha.length >= 6) {
            try{
                
                
                const resposta = await auth.createUserWithEmailAndPassword (email, senha);
                console.log("Do criado: ", resposta)
                
                const uid = auth.currentUser.uid;
                setState({
                    ...state, key: uid
                })
                setNewUser(true);


            }catch(error){
                setState({
                    ...state, msg: "não foi possível cadastrar o usuário"
                })
            }
        }else{
            setState({
                ...state, msg: "senha deve conter no mínimo 6 caracteres"
            })
        }
    }

    
// console.log(firebase.auth.currentUser.uid)
    console.log(state.key)
    const concluirCadastro = async () => {
        
        await firebase.db.collection('motoTaxista').doc(state.key).set({
            nomeMotorista: state.nomeMotorista,
            email: state.email,
            cnh: state.cnh,
            renavan: state.renavan,
            cor: state.cor,
            status: state.status,
            modeloMoto: state.modeloMoto,
            cpf: state.cpf,
            endereco: state.endereco,
            licenca: state.licenca,
            placa: state.placa
            
    
        }).then(
            ()=>{
                alert("Motorista cadastrado.");
                
                setOk(true);
            }
        ).catch(
            ()=>alert("Não foi possivel inserir.")
        )
    }
    
    if(ok){
        navigation.goBack();
    }

    
    return(
        <View style={styles.container}>

            <View style={styles.viewLogo}>
            <Image
            style={styles.logo} 
            source={require('./cooperativa2.png')}/>
            </View>

            <Text style={styles.h1}>Adicionar MotoTaxistas</Text>
            
            <TextInput
                style={styles.input}
                placeholder='Email'
                defaultValue={state.email}
                onChangeText={
                    (value)=>handleInputChange('email', value)
                }
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry={true}
                defaultValue={state.senha}
                onChangeText={
                    (value)=>handleInputChange('senha', value)
                }
            />
            {newUser == false ? (
                 <TouchableOpacity style={styles.btnSubmit} onPress={addMotoqueiro}>
                 <Text style={styles.txt}>Adicionar</Text>
             </TouchableOpacity>

                
            ):(
                // <TextInput placeholder='Nome' />

                <>
                <ScrollView>
                <TextInput
                style={styles.input}
                placeholder='nomeMotorista'
               
                defaultValue={state.nomeMotorista}
                onChangeText={
                    (value)=>handleInputChange('nomeMotorista', value)
                }
            />
                
                <TextInput
                style={styles.input}
                placeholder='cnh'
               
                defaultValue={state.cnh}
                onChangeText={
                    (value)=>handleInputChange('cnh', value)
                }
            />

                <TextInput
                style={styles.input}
                placeholder='renavan'
               
                defaultValue={state.renavan}
                onChangeText={
                    (value)=>handleInputChange('renavan', value)
                }
            />
                <TextInput
                style={styles.input}
                placeholder='cor'
                
                defaultValue={state.cor}
                onChangeText={
                    (value)=>handleInputChange('cor', value)
                }
            />
                <TextInput
                style={styles.input}
                placeholder='status'
                
                defaultValue={state.status}
                onChangeText={
                    (value)=>handleInputChange('status', value)
                }
            />

                <TextInput
                style={styles.input}
                placeholder='modeloMoto'
               
                defaultValue={state.modeloMoto}
                onChangeText={
                    (value)=>handleInputChange('modeloMoto', value)
                }
            />
                <TextInput
                style={styles.input}
                placeholder='cpf'
                
                defaultValue={state.cpf}
                onChangeText={
                    (value)=>handleInputChange('cpf', value)
                }
            />
                <TextInput
                style={styles.input}
                placeholder='endereco'
                
                defaultValue={state.endereco}
                onChangeText={
                    (value)=>handleInputChange('endereco', value)
                }
            />
                <TextInput
                style={styles.input}
                placeholder='licenca'
               
                defaultValue={state.licenca}
                onChangeText={
                    (value)=>handleInputChange('licenca', value)
                }
            />
                <TextInput
                style={styles.input}
                placeholder='placa'
                
                defaultValue={state.placa}
                onChangeText={
                    (value)=>handleInputChange('placa', value)
                }
            />

             <TouchableOpacity style={styles.btnSubmit} onPress={concluirCadastro}>
                 <Text>Cadastrar</Text>
             </TouchableOpacity> 

               </ScrollView>
       
            </>
            )}
            
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
  h1:{
      fontSize:20,
      fontWeight:'bold',
      padding:12
  }, 
  input:{
    height:60, 
    width:'90%',
    borderWidth:1, 
    padding:10,
    marginTop:5,
    borderRadius: 7,
    backgroundColor:'white',
    },

  btnSubmit:{
    backgroundColor: '#FF6701',
    width:'80%',
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    margin: 10,
},

txt:{
    color: "white",
    fontWeight: '600',
},
});
