import React from 'react'
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';


const ELIMINAR_PRODUCTO = gql `
mutation eliminarProducto($id: ID!){
    eliminarProducto( id: $id )
}
`;

 const Producto = ({ elementos }) => {

    const[ eliminarProducto ] = useMutation( ELIMINAR_PRODUCTO );

    const { id, precio, existencia, nombre  } = elementos;

    const confirmarEliminacionProductos =  ( id ) => {
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
                        'Your file has been deleted.',
                        'success'
                    )


                } catch (error) {
                    console.log( error )
                }
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
                          <button className="bg-blue-800 p-2 text-white"  >
                                Editar
                          </button>
                      </td>
                     
                      </tr>
      
    )
}


export default Producto;
