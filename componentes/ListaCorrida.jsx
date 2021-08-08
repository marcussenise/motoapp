import React, {useState} from 'react';
import { useEffect } from 'react';
import { StyleSheet, Button, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import firebase from '../firebase';

export default function ListaCorrida({navigation}){
    //     esse state será responsável por escolher a renderização após o carregamento dos dados
    const [loading, setLoading] = useState(true) ;
    const [state, setState] = useState({
        status: ''
    });
    const [ok, setOk] = useState(false);

    // const [status, setStatus] = useState({
    //     solicitado: '',
    //     atribuido: '',
    //     concluido: '',
    // })

    const atribuir = () => {
        console.log(state)
        setState({
            ...state, status: false
        })

     
        if(state == true) {
          setState({
              ...state, status: 'solicitado'
          })
      } else if(state == false){
          setState({
              ...state, status: 'atribuido'
          })
      } else{
          setState({
              ...state, status: 'concluido'
          })
      }
    } 
  
    // const [calculaImc, setCalculaImc] = useState({
    //     peso: '',
    //     altura: '',
    //     resultado: ''
        
    // })

    // const calcular = () => {

    //     const temp = (calculaImc.peso / (calculaImc.altura * calculaImc.altura )).toFixed(2);
           
    //     if(temp <=  18.4 ) {
    //         setCalculaImc({
    //             ...calculaImc, resultado: ` ${temp} Abaixo do peso - Indivíduo com Fadiga, Strees, Ansiedade.`
    //         })
    //     } else if(temp >= 18.5 && temp <=  24.9 ) {
    //         setCalculaImc({
    //             ...calculaImc, resultado: `${temp} - Peso normal - Indivíduo com menor risco de doenças cardíacas e vasculares`
    //         })
    //     } else {
    //         setCalculaImc({
    //             ...calculaImc, resultado: `${temp} - Acima do peso - Fadiga, má circulação, varizes.`
    //         })
    //     }  
    // }



    useEffect(
        ()=> {
            navigation.addListener(
                'focus', ()=>pegaDados()
            )
        },[]
    )

   
    
    const pegaDados = async () => {
        const users = firebase.db.collection("viagens");
        const querySnapShot = await users.get();
        const dados = querySnapShot.docs;
        

        const listaCorridas = [];

        dados.forEach(
            doc => {
                listaCorridas.push({
                    ...doc.data(),
                    key: doc.id,
                })
               
            }
        )

        setState(listaCorridas);
        setLoading(false);        
    }
    console.log('dados', state)
        

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
               <Text style={styles.dados}>Cliente: {item.cliente}</Text>
               <Text style={styles.dados}>Origem: {item.origem}</Text>
               <Text style={styles.dados}>Destino: {item.destino}</Text>
               <Text style={styles.dados}>Data: {item.data}</Text>
               <Text style={styles.dados}>Hora: {item.hora}</Text>
               <Text style={styles.dados}>Id cliente: {item.keycliente}</Text>
               <Text style={styles.dados}>Status: {item.status}</Text>

               <TouchableOpacity style={styles.btnSubmit} onPress={atribuir}>
                <Text style={styles.txt}>Atribuir viagem</Text>
            </TouchableOpacity>

            {/* onPress={()=> navigation.navigate('Atualizar',item.key)}> */}
              
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
        paddingTop: 80
    },

    btnSubmit:{
        backgroundColor: '#FF6701',
        width: 140,
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
    },
})