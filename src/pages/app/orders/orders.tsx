import { Helmet } from 'react-helmet-async'

import { FilterBarOrders } from './components/filter-bar-orders'
import { TableOrders } from './components/table-orders'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="flex flex-col gap-3">
          <FilterBarOrders />

          <div className="rounded-md border">
            <TableOrders />
          </div>
        </div>
      </div>
    </>
  )
}
