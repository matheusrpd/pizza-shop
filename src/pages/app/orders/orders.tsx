import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'

import { OrderTableFilters } from './components/order-table-filters'
import { TableOrders } from './components/table-orders'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="flex flex-col gap-3">
          <OrderTableFilters />

          <div className="rounded-md border">
            <TableOrders />
          </div>
        </div>

        <Pagination pageIndex={0} totalCount={105} perPage={10} />
      </div>
    </>
  )
}
