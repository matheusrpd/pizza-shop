import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type PaginationProps = {
  pageIndex: number
  totalCount: number
  perPage: number
}
export function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <span className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </span>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" className="h-8 w-8 p-0">
                  <ChevronsLeft className="h-4 w-4" />
                  <span className="sr-only">Primeira página</span>
                </Button>
                <TooltipContent>
                  <p>Primeira página</p>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Página anterior</span>
                </Button>
                <TooltipContent>
                  <p>Página anterior</p>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Próxima página</span>
                </Button>
                <TooltipContent>
                  <p>Próxima página</p>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" className="h-8 w-8 p-0">
                  <ChevronsRight className="h-4 w-4" />
                  <span className="sr-only">Última página</span>
                </Button>
                <TooltipContent>
                  <p>Última página</p>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
