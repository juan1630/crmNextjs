import Head from 'next/head';
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Cliente  } from "../components/cliente"

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

  const router = useRouter();

  // consulta de apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  if( loading ) return 'Cargando...';

  if(!data.obtenerClientesVendedor){

    return  router.push('/login');
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light mb-3">  Clientes </h1>


        <Link   href="/nuevoCliente" >
          <a className="bg-blue-800 py-2 px-5 mt-5 inñine-block text-white rounded texr-sm hover:bg-gray-800 mb-3 uppercase font-bold" >
              Nuevo cliente
          </a>
        </Link>

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
                    <th className="w-1/5 py-2" >
                        Eliminar
                    </th>
                    <th className="w-1/5 py-2" >
                        Editar
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white">
                { data.obtenerClientesVendedor.map( cliente => (
                  <Cliente
                  key={  cliente.id  }
                  cliente={ cliente }
                  />
                )) }
            </tbody>
        </table>
      </Layout>
    </div>
  )
}


export default Index;