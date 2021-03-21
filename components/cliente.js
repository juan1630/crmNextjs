import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation} from '@apollo/client';

const ELIMINAR_CLIENTE =  gql `
   mutation eliminarCliente( $id: ID! ){
      eliminarCliente( id: $id)
   }
`;


const OBTENER_CLIENTES_USUARIO = gql `
  query obtenerClientesVendedor {
      obtenerClientesVendedor {
        nombre,
        apellido,
        empresa,
        email,
        id
      }
  }
`;


export const Cliente = ({ cliente }) => {


    const { nombre, apellido, empresa, email , id} = cliente;

    // mutation de eliminar un cliente

    const [ eliminarCliente ] = useMutation( ELIMINAR_CLIENTE, { 
       update (cache){
          //obtener una copia del cache 
          const { obtenerClientesVendedor } = cache.readQuery( { query: OBTENER_CLIENTES_USUARIO} );
          
          //reescribir el cache 
           
          cache.writeQuery({
             query: OBTENER_CLIENTES_USUARIO,
             data: {
                obtenerClientesVendedor: obtenerClientesVendedor.filter( clienteActual =>  clienteActual.id != id )
             }
          })

       }
    } );

    // elimina un cliente
      
    const  confirmaEliminarCliente = (id) =>{
      

      Swal.fire({
         title: 'Deseas eliminar a este usuarios?',
         text: "Esta accion no se puede deshacer",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, Eliminar',
         cancelButtonText: "No, Cancelar"
       }).then(  async (result) => {
         if (result.isConfirmed) {
            
            try {
               
               console.log('Eliminando...')
               // eliminar por id 

               const { data } =  await eliminarCliente({
                  variables:{
                     id
                  }
               });

               console.log(data)

               // mostrar alerta 
               Swal.fire(
                  'Eliminado!',
                  'Your file has been deleted.',
                  'success'
                )


            } catch (error) {
                  console.log( error)
            }

          
         }
       })

   }

    return (
        

            <tr  key={id}  >
                      <td className="border px-4 py-2 "  >
                         { nombre }  { apellido }
                      </td>
                      <td className="border px-4 py-2 "  >
                         { empresa } 
                      </td>
                      <td className="border px-4 py-2 "  >
                         { email }
                      </td>
                      <td className="border px-4 py-2 "  >
                          <button
                            type="button"
                            className="flex justify-center items-center bg-red-800 py-2 px-2 w-full text-white rounded text-xs uppercase  font-bold"
                            onClick={ ()=> confirmaEliminarCliente( id )  }
                          >
                    

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                            Eliminar

                          </button>
                      </td>

                    </tr>
        
    )
}
