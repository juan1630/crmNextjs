import React from 'react';
import { useQuery, gql  } from '@apollo/client';
import { useRouter } from 'next/router';
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

    const router = useRouter();
    const { data, loading, error} = useQuery(  OBTENER_USUARIO );
    // console.log( data );

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login')

    }
 
    // proteger que no se acceda a data sino hya datos
   
    if(loading) return null;

    // aseguramos el comonente del header
    if(!data){
        return router.push('/login')
    }

    const { name, lastName  } = data.obtenerUsuario;

    return (
        <div className="flex justify-between mb-5" >
            <h1>  Bienvenido: { name }  { lastName}  </h1>
            <button  type="button" 
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                onClick={  () =>  cerrarSesion() }
            >
                Cerrar sesión
            </button>
        </div>
    )
}
