import React, {useState} from 'react';
import { useEffect } from 'react';
import { StyleSheet, Button, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import firebase from '../firebase';

export default function ListaMotorista({navigation}){
    //     esse state será responsável por escolher a renderização após o carregamento dos dados
    const [loading, setLoading] = useState(true) ;
    const [state, setState] = useState([]);

    // const [motorista,setMotorista] = useState([]);

    useEffect(
        ()=> {
            navigation.addListener(
                'focus', ()=>pegaDados()
            )
        },[]
    )

    // useEffect(
    //     ()=> {
    //         navigation.addListener(
    //             'focus', ()=>pegaMotorista()
    //         )
    //     },[]
    // )
    
    const pegaDados = async () => {
        const users = firebase.db.collection("motoTaxista");
        const querySnapShot = await users.get();
        const dados = querySnapShot.docs;
        

        const listMotorista = [];

        dados.forEach(
            doc => {
                listMotorista.push({
                    ...doc.data(),
                    key: doc.id,
                })
               
            }
        )

        setState(listMotorista);
        setLoading(false);        
    }
    console.log('dados', state)
    
    const pegaMotorista = async () => {
        const motorista = firebase.db.collection("motoTaxista");
        const querySnapShot = await motorista.get();
        const dados = querySnapShot.docs;
        

        const listMotorista = [];

        dados.forEach(
            doc => {
                listMotorista.push({
                    ...doc.data(),
                    key: doc.id,
                })
                
            }
        )
        

        setMotorista(listMotorista);
        setLoading(false);   
        
        console.log('dados',listMotorista)
    }
        

    if(loading){
        return <ActivityIndicator animating={true} size="large" color='#FEA82F'
         />

    }
    
    return(
            <ScrollView>
        <View style={styles.container}>
            
            <View style={styles.viewLogo}>

            <Image
            style={styles.logo} 
            source={require('./cooperativa2.png')}/>

            </View>

            <Text style={styles.viewText}> Lista de Motoristas </Text>
            {/* <Button title="Adicionar Motorista" 
             onPress = { () => {setLoading(false); navigation.navigate('Cadastro')}}
             /> */}

            <FlatList
            data={state}
            renderItem={
                ({item})=>(
            <View >
               <Text style={styles.dados}>Nome: {item.nomeMotorista}</Text>
               <Text style={styles.dados}>cpf: {item.cpf}</Text>
               <Text style={styles.dados}>Endereço: {item.endereco}</Text>
               <Text style={styles.dados}>Cnh: {item.cnh}</Text>
               <Text style={styles.dados}>Licença: {item.licenca}</Text>
               <Text style={styles.dados}>Modelo da Moto: {item.modeloMoto}</Text>
               <Text style={styles.dados}>Placa: {item.placa}</Text>
               <Text style={styles.dados}>Cor: {item.cor}</Text>
               <Text style={styles.dados}>Revanan: {item.renavan}</Text>
               <Text style={styles.dados}>Status: {item.status}</Text>

               <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('Atualizar',item.key)}>
                <Text style={styles.txt}>Atualizar</Text>
            </TouchableOpacity>

               <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('Deletar',item.key)}>
                <Text style={styles.txt}>Deletar</Text>
            </TouchableOpacity>
              
            </View>
            )} 
            />

    
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
        margin: 10,
        paddingTop: 40
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
    dados: {
        margin: 3
    },

    
    txt:{
        color: "white",
        fontWeight: '600',
    }
})