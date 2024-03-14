import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderDetails } from './order-details'
import { OrderRowActions } from './order-row-actions'

export function TableOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16"></TableHead>
          <TableHead className="w-36">Identificador</TableHead>
          <TableHead className="w-56">Realizado há</TableHead>
          <TableHead className="w-56">Status</TableHead>
          <TableHead className="w-56">Total</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead className="w-16"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-8 w-8 p-0">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Detalhes do pedido</span>
                  </Button>
                </DialogTrigger>

                <OrderDetails />
              </Dialog>
            </TableCell>

            <TableCell className="font-mono font-medium">
              cucncujnweucjvnbwujh
            </TableCell>

            <TableCell>há 15 minutos</TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                <span className="font-medium">Pendente</span>
              </div>
            </TableCell>

            <TableCell className="font-medium">R$ 149,90</TableCell>

            <TableCell className="font-medium">
              Matheus Allan de Oliveira
            </TableCell>

            <TableCell className="flex justify-end">
              <OrderRowActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
