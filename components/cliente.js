import React from 'react'

export const Cliente = ({ cliente }) => {


    console.log(  cliente);

    const { nombre, apellido, empresa, email , id} = cliente;

    // elimina un cliente
   const  confirmaEliminarCliente = (id) =>{
    console.log(id);
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
