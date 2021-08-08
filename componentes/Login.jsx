import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView , Checkbox, Platform} from 'react-native';
import firebase from '../firebase';

export default function Login({navigation}){

    const {logado, deslogado} = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    const[state, setState] = useState({
        email:'',
        senha:'',
        msg:''
    })

    // const [newUser, setNewUser] =useState(false);

    const handleInputChange = (name,value) => {
        setState ({
            ...state, [name]:value
        })
    }

    useEffect(
        () => {
            
        },[]
    )

    const login = async () => {
        const auth = firebase.auth;
        const {email, senha} = state;
        try{
            const resposta = await auth.signInWithEmailAndPassword(email, senha);
            console.log(resposta)
            const user = auth.currentUser
            if(user){
                if(user.emailVerified){
                    logado(user);
                    navigation.navigate('Navegacao')
                }else{
                    auth.signOut();
                    user.sendEmailVerification();
                    deslogado();
                    setLoading(false);
                }
            }else{
                setLoading(false);
            }

        }catch(error){
            setState({
                ...state, msg: 'email ou senha inválidos'

            })
            console.log(error)
        }

        
            // const unsubscribed = auth.onAuthStateChanged(
            //     user => {
            //         // console.log(user)
            //         if(user){
            //             if(user.emailVerified){
            //                 logado(user);
            //                 navigation.navigate('Navegacao')
            //             }else{
            //                 auth.signOut();
            //                 user.sendEmailVerification();
            //                 deslogado();
            //                 setLoading(false);
            //             }
            //         }else{
            //             setLoading(false);
            //         }
            //     }
            // )
            // return  unsubscribed();

    }

    // const cadastrar = async () =>{
    //     const auth = firebase.auth;
    //     const {email, senha} = state;
    //     if(senha.lenght >= 6) {
    //         try{
    //             const resposta = await auth.createUserWithEmailAndPassword (email, senha);
    //             auth.currentUser.sendEmailVerification();
    //             setNewUser(false);
    //             setState({
    //                 ...state, msg: "Verifique sua conta de email"
    //             })
    //         }catch(error){
    //             setState({
    //                 ...state, msg: "não foi possível cadastrar o usuário"
    //             })
    //         }
    //     }else{
    //         setState({
    //             ...state, msg: "senha deve conter no mínimo 6 caracteres"
    //         })
    //     }
    // }
    return(
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} >
          
            <View style={styles.viewLogo}>

                <Image
                style={styles.logo} 
                source={require('./cooperativa2.png')}/>
    
            </View>

            <View style={styles.viewText}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    defaultValue={state.email}
                    autoCorrect={false}
                    keyboardType='email-address'
                    onChangeText={(value) => handleInputChange ('email', value)} />
                    
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    defaultValue={state.senha}
                    autoCorrect={false}
                    keyboardType='numeric'
                    onChangeText={(value) => handleInputChange ('senha', value)}
                    secureTextEntry={true}/>

                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => login()}
                    >
                    <Text style={styles.textSubmit}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnElse}>
                    <Text style={styles.btnColor}>Esqueci minha senha</Text>
                </TouchableOpacity>

                <Text>
                    {state.msg}
                </Text>


            </View>
        {/* </View> */}

        </KeyboardAvoidingView>

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
        width:'30%',
        height:'15%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    textSubmit:{
        color:'white',
        fontSize:18,
    },
    btnElse:{
        marginTop:10,
    },
    btnColor:{
        color:'black'
    },
});