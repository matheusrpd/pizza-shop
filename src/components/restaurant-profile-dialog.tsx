import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/http/restaurants/get-managed-restaurant'
import { updateData } from '@/http/restaurants/update-data'

const restaurantProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type RestaurantProfileData = z.infer<typeof restaurantProfileSchema>

export function RestaurantProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { mutateAsync: updateDataRestaurant, isPending: isSubmitting } =
    useMutation({
      mutationFn: updateData,
      onMutate: ({ name, description }) => {
        const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
          'managed-restaurant',
        ])

        updateDataRestaurantCache({ name, description })

        return { previousData: cached }
      },
      onError(_, __, context) {
        if (context?.previousData) {
          updateDataRestaurantCache({
            name: context.previousData.name,
            description: context.previousData.description,
          })
        }

        toast.error('Falha ao atualizar o perfil, tente novamente')
      },
    })

  const { register, handleSubmit } = useForm<RestaurantProfileData>({
    resolver: zodResolver(restaurantProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  function updateDataRestaurantCache({
    name,
    description,
  }: RestaurantProfileData) {
    queryClient.setQueryData(
      ['managed-restaurant'],
      (cached: GetManagedRestaurantResponse) => ({
        ...cached,
        name,
        description,
      }),
    )
  }

  async function handleUpdateRestaurantProfile({
    name,
    description,
  }: RestaurantProfileData) {
    await updateDataRestaurant(
      { name, description },
      {
        onSuccess: () => {
          toast.success('Perfil atualizado com sucesso')
        },
      },
    )
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form
        id="update-restaurant-profile"
        onSubmit={handleSubmit(handleUpdateRestaurantProfile)}
      >
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" className="col-span-3" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              {...register('description')}
            />
          </div>
        </div>
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          form="update-restaurant-profile"
          type="submit"
          variant="success"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Salvar'
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
