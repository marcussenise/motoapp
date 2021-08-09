import React, {useState} from 'react';
import { useEffect } from 'react';
import { StyleSheet, Button, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import firebase from '../firebase';

export default function ListaCorrida({navigation}){
    //     esse state será responsável por escolher a renderização após o carregamento dos dados
    const [loading, setLoading] = useState(true) ;
    const [state, setState] = useState([]);
    const [state2, setState2] = useState([]);
       
    
    useEffect(
        ()=> {
            navigation.addListener(
                'focus', ()=>pegaDados(), ()=>pegaMotoristas()
                )
        },[]
        )
        
    const pegaMotoristas = async () => {
        const users2 = firebase.db.collection("motoTaxista");
        const querySnapShot = await users2.get();
        const dados2 = querySnapShot.docs;
        
        
        const listMotorista = [];
        
        dados2.forEach(
            doc => {
                listMotorista.push({
                    ...doc.data(),
                })
                
            }
            )
            setState2(listMotorista);
            setLoading(false);        
        }
        console.log(state2)
        

       
        
        
        
        const pegaDados = async () => {
            const users = firebase.db.collection("viagens");
            const querySnapShot = await users.get();
            const dados = querySnapShot.docs;
            
            
            const listaCorridas = [];
            
            dados.forEach(
                doc => {
                    listaCorridas.push({
                        ...doc.data(),
                    })
                    
                }
                )
                setState(listaCorridas);
                setLoading(false);    
            }
            // console.log(state)    
            // console.log('dados', state)
            // console.log(state2)
            
            
            if(loading){
                return <ActivityIndicator animating={true} size="large" color='#FEA82F'/>
            }
            
           
                return(
                    <ScrollView>
                    <View style={styles.container}>
                    
                    <View style={styles.viewLogo}>
                    <Image
                    style={styles.logo} 
                    source={require('./cooperativa2.png')}/>
                    </View>
        
                    <Text style={styles.viewText}> Lista de Corridas </Text>
                    <FlatList
                    data={state}
                    renderItem={
                        ({item})=>(
                    <View >
                       {/* <Text style={styles.dados}>Cliente: {item.cliente}</Text> */}
                       <Text style={styles.dados}>Origem: {item.origem.nome}</Text>
                       <Text style={styles.dados}>Destino: {item.destino.nome}</Text>
                       <Text style={styles.dados}>Data: {item.data}</Text>
                       <Text style={styles.dados}>Hora: {item.hora}</Text>
                       <Text style={styles.dados}>Preço: {item.preco}</Text>
                       <Text style={styles.dados}>Id cliente: {item.keycliente}</Text>
                       <Text style={styles.dados}>Status: {item.status}</Text>
                       <TouchableOpacity style={styles.btnSubmit} onPress={()=> 
                            <FlatList
                            data={state2}
                            renderItem={({ item }) => <Text>{item.nomeMotorista}</Text>}
                        
                        />
                            }>
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