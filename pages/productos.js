import Layout from '../components/Layout';
import { useRouter  } from 'next/router'
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';



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

 const  Productos = () => { 

    const router = useRouter();   

  const {data, loading, error} = useQuery( OBTENER_PRODUCTOS );

  console.log(data);

  // console.log( error )
  if( !data) return 'Cargando...'

  return (
    <div>
      <Layout>
      <h1 className="text-2xl text-gray-800 font-light mb-3">  Productos </h1>
        <Link href="/nuevoCliente" >
          <a className="bg-blue-800 uppercase text-white inline-block  text-sm font-bold p-1 rounded">
              Nuevo producto
          </a>
        </Link>

          <table className="table-auto shadow-md mt-5"  >
              <thead  className="bg-gray-800" >

                <tr className="text-white"  > 
                  <th className="w-1/5 py-2" >
                        Nombre
                    </th>
                    <th className="w-3/5 py-2" >
                        Precio
                    </th>
                    <th className="w-4/5 py-2 " >
                        Existencia
                    </th>
                </tr>
            
              </thead>

              <tbody>
                  { data.obtenerProducots.map( elementos => (
                      <tr  key={elementos.id}   >
                      <td className="border px-4 py-2 "  >
                         { elementos.nombre }  
                      </td>
                      <td className="border px-4 py-2  text-center" >
                        { elementos.precio }
                      </td>
                      <td className="border px-4 py-2 " >
                          { elementos.existencia }
                      </td>
                     
                      </tr>
                  )) }
          
              </tbody>
          </table>


      </Layout>
    </div>
  )
}

// en pages sedebe de crear el archivo js como estarà en la URL
export default Productos;