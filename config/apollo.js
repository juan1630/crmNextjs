import { ApolloClient, HttpLink, createHttpLink ,InMemoryCache } from '@apollo/client'
import fetch  from 'node-fetch';
// esta librerìa sirve para hacer las peticiones por via headers

import { setContext } from 'apollo-link-context';


const httpLink = createHttpLink({
    // configuramos nuestro access point
    uri: 'http://localhost:4000/',
    fetch
}); 


const authLink = setContext( (_, { headers })=> {

    //leer el storage almacenado
        const token = localStorage.getItem('token')
    return {  
            // agregamos nuestro header a los demas headers 
            headers:{
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
});

// apollo server es solo para node donde se declaran los modelos
// node fetch nos permite traer los resultados  y pintarlos en los componentes

const client = new ApolloClient({
    connectToDevTools: true,
    cache : new InMemoryCache(),
    link: authLink.concat( httpLink )
});


export default client