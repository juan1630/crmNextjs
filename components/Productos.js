import React from 'react'
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router'


const ELIMINAR_PRODUCTO = gql `
mutation eliminarProducto($id: ID!){
    eliminarProducto( id: $id )
}
`;



const OBTENER_PRODUCTOS = gql `
query obetenerProducots {
  obtenerProducots{
    nombre
    id
    existencia
    creado
  precio
  }
}
`;

 const Producto = ({ elementos }) => {


 

    const[ eliminarProducto ] = useMutation( ELIMINAR_PRODUCTO, { 
        update(cache ) {
            const { obtenerProducots } = cache.readQuery({ query: OBTENER_PRODUCTOS });
            
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: { 
                    obtenerProducots: obtenerProducots.filter( productoActual => productoActual.id != id )
                }
            })
        }
    } );

    const { id, precio, existencia, nombre  } = elementos;

    const confirmarEliminacionProductos =  (  ) => {

        console.log(id  )
        Swal.fire({
            title: 'Deseas eliminar este producto?',
            text: "Esta accion no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: "No, Cancelar"
          })
          .then(  async result  => {

              if(result.isConfirmed){
                try {
                 
                 const {data}  =  await eliminarProducto({
                        variables: {
                            id
                        }
                    });

                    console.log( data );

                      // mostrar alerta 
                    Swal.fire(
                        'Eliminado!',
                        'El producto ha sido eliminado',
                        'success'
                    )


                } catch (error) {
                    console.log( error )
                }
              }
          })
    }


    const editarProducto = () => {
        
        Router.push({
            pathname: "/editarproducto/[id]",
            query: {
                id
             }
        })

    }

    //  console.log( elementos )
    return (
   
             <tr  key={id}   >
                      <td className="border px-4 py-2 "  >
                         { nombre }  
                      </td>
                      <td className="border px-4 py-2  text-center" >
                        { precio }
                      </td>
                      <td className="border text-center px-4 py-2 " >
                          { existencia }
                      </td>

                      <td  className="border px-4 py-2"  >
                          <button className="bg-red-800 p-2 text-white" onClick={ () => { confirmarEliminacionProductos()  } }  >
                                Eliminar
                          </button>
                      </td>
                      <td  className="border px-4 py-2"  >
                          <button className="bg-blue-800 p-2 text-white"  onClick={ ()=> {editarProducto() }  } >
                                Editar
                          </button>
                      </td>
                     
                      </tr>
      
    )
}


export default Producto;
