import Head from 'next/head';
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';


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

 const  Index = () => {

  // consulta de apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  console.log( data );

  if( loading ) return 'Cargando...';

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">  Clientes </h1>

        <table  className="table-auto shadow-md mt-10 w-full w-lg" >
            <thead className="bg-gray-800"  >
                <tr  className="text-white" >
                    <th className="w-1/5 py-2" >
                        Nombre
                    </th>
                    <th className="w-1/5 py-2" >
                        Empresa
                    </th>
                    <th className="w-1/5 py-2" >
                        Email
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white">
                { data.obtenerClientesVendedor.map( clientes => (
                    <tr  key={clientes._id}  >
                      <td className="border px-4 py-2 "  >
                         { clientes.nombre }  { clientes.apellido }
                      </td>
                      <td className="border px-4 py-2 "  >
                         { clientes.empresa } 
                      </td>
                      <td className="border px-4 py-2 "  >
                         { clientes.email }
                      </td>
                    </tr>
                )) }
            </tbody>
        </table>
      </Layout>
    </div>
  )
}


export default Index;