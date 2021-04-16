import Layout from '../components/Layout'
import Link from 'next/link'

 const  Pedidos = () => {
  return (
    <div>
      <Layout>
         <h1 className="text-2xl text-gray-800 font-light">  Pedidos </h1>

          <Link href="/nuevopedido" >
              <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded  text-sm " >
                Nuevo pedido
              </a>
          </Link>

      </Layout>
    </div>
  )
}

// en pages sedebe de crear el archivo js como estarà en la URL
export default Pedidos;