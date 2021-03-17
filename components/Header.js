import React from 'react';
import { useQuery, gql  } from '@apollo/client';

// obtenemos el usuario
const OBTENER_USUARIO = gql `
query obtenerUsuario {
    obtenerUsuario{
      name
      lastName
      email
      id
    }
  }`

export const Header = () => {
    const { data, loading, error} = useQuery(  OBTENER_USUARIO );
    console.log( data );

    // proteger que no se acceda a data sino hya datos
   
    if(loading) return null;
    const { name  } = data.obtenerUsuario;

    return (
        <div className="flex justify-between mb-5" >
            <h1>  Hola : Juan </h1>
            <button  type="button"  >
                Cerrar sesión
            </button>
        </div>
    )
}
