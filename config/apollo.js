import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch  from 'node-fetch';

// apollo server es solo para node donde se declaran los modelos
// node fetch nos permite traer los resultados  y pintarlos en los componentes

const client = new ApolloClient({
    connectToDevTools: true,
    cache : new InMemoryCache(),
    link: new  HttpLink({
        uri: 'http://localhost:4000/',
        fetch
    })

});


export default client