import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'; 
import  client from '../config/apollo';

// hace que apollo este disponible en todos los componentes
function MyApp({ Component, pageProps }) {
  // console.log( 'desde _app.js' )
  return (

    <ApolloProvider client={ client}  >

      <Component {...pageProps} />

    </ApolloProvider>
    ) 
}

export default MyApp
