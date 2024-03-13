import { Input } from '@/components/ui/input'

export function FilterBarOrders() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="Nome do cliente" className="h-8 w-80" />
    </form>
  )
}
