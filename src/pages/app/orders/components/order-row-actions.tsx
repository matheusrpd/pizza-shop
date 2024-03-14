import { Ellipsis, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { OrderDetails } from './order-details'

export function OrderRowActions() {
  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[180px]">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Search className="mr-2 h-4 w-4" />
              Ver detalhes
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <OrderDetails />
    </Dialog>
  )
}
