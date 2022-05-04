import { Link } from "react-router-dom";

const transactions: any = [
    {
      id: 'AAPS0L',
      company: 'Chase & Co.',
      share: 'CAC',
      commission: '+$4.37',
      price: '$3,509.00',
      quantity: '12.00',
      netAmount: '$4,397.00',
    },
    {
        id: 'AAPS0L',
        company: 'Chase & Co.',
        share: 'CACRRR',
        commission: '+$4.37',
        price: '$3,509.00',
        quantity: '12.00',
        netAmount: '$4,397.00',
      },
      {
        id: 'AAPS0L',
        company: 'Chase & Co.',
        share: 'CACAA',
        commission: '+$4.37',
        price: '$3,509.00',
        quantity: '12.00',
        netAmount: '$4,397.00',
      },
      {
        id: 'AAPS0L',
        company: 'Chase & Co.',
        share: 'CACHH',
        commission: '+$4.37',
        price: '$3,509.00',
        quantity: '12.00',
        netAmount: '$4,397.00',
      },
      {
        id: 'AAPS0L',
        company: 'Chase & Co.',
        share: 'CACLLL',
        commission: '+$4.37',
        price: '$3,509.00',
        quantity: '12.00',
        netAmount: '$4,397.00',
      },
      {
        id: 'AAPS0L',
        company: 'Chase & Co.',
        share: 'CACVVVV',
        commission: '+$4.37',
        price: '$3,509.00',
        quantity: '12.00',
        netAmount: '$4,397.00',
      },
      {
          id: 'AAPS0L',
          company: 'Chase & Co.',
          share: 'CACXCXX',
          commission: '+$4.37',
          price: '$3,509.00',
          quantity: '12.00',
          netAmount: '$4,397.00',
        },
        {
          id: 'AAPS0L',
          company: 'Chase & Co.',
          share: 'CACLOLD',
          commission: '+$4.37',
          price: '$3,509.00',
          quantity: '12.00',
          netAmount: '$4,397.00',
        },
        {
          id: 'AAPS0L',
          company: 'Chase & Co.',
          share: 'CACGFDS',
          commission: '+$4.37',
          price: '$3,509.00',
          quantity: '12.00',
          netAmount: '$4,397.00',
        },
        {
          id: 'AAPS0L',
          company: 'Chase & Co.',
          share: 'CACTREW',
          commission: '+$4.37',
          price: '$3,509.00',
          quantity: '12.00',
          netAmount: '$4,397.00',
        },
    // More transactions...
  ];

  interface IDataComponents {
      data?: any[];
      isMessage?: boolean;
      title?: string;
      message?: string;
      descripcion?: string;
  }
  
  export default function TableComponent(props: IDataComponents) {
      console.log(props.data);
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        
        {
            props.isMessage ?
                <>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl text-gray-900">
                                {
                                    props.title
                                }
                            </h1>
                            <p className="mt-2 text-sm text-gray-700">
                                {
                                    props.descripcion
                                }
                            </p>
                        </div>
                    </div>
                </> 
                : null
        }

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Commision
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Quantity
                      </th>
                      <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {transactions.map((transaction: any) => (
                      <tr key={transaction.id}>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                          {transaction.id}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.commission}</td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.price}</td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.quantity}</td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link to={`/${transaction.id}`} className={'text-indigo-600 hover:text-indigo-900'}>
                            Ver       
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }