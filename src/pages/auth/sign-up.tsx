import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerRestaurant } from '@/http/auth/register-restaurant'

const signUpFormSchema = z.object({
  restaurantName: z.string().min(1, 'Informe o nome do restaurante'),
  managerName: z.string().min(1, 'Informe o seu nome'),
  phone: z.string().min(1, 'Informe o seu celular'),
  email: z.string().email('Informe um e-mail válido'),
})

type signUpFormData = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const form = useForm<signUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      restaurantName: '',
      managerName: '',
      email: '',
      phone: '',
    },
  })

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp({
    restaurantName,
    managerName,
    email,
    phone,
  }: signUpFormData) {
    await registerRestaurantFn(
      {
        restaurantName,
        managerName,
        email,
        phone,
      },
      {
        onSuccess: () => {
          form.reset()

          toast.success('Restaurante cadastrado', {
            description: 'O seu restaurante foi cadastrado com sucesso!',
            action: {
              label: 'Login',
              onClick: () => navigate(`/sign-in?email=${email}`),
            },
          })
        },
        onError: () => {
          toast.error('Erro no cadastro', {
            description: 'Revise os dados e tente novamente',
          })
        },
      },
    )
  }

  return (
    <div className="w-full p-8">
      <Helmet title="Cadastro" />

      <Button asChild variant="ghost" className="absolute right-8 top-8">
        <Link to="/sign-in">Fazer login</Link>
      </Button>

      <div className="mx-auto flex w-full max-w-sm flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece suas vendas!
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="restaurantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="restaurantName">
                    Nome do restaurante
                  </FormLabel>

                  <FormControl>
                    <Input
                      id="restaurantName"
                      placeholder="Pizza Shop"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="managerName">Seu nome</FormLabel>

                  <FormControl>
                    <Input
                      id="managerName"
                      placeholder="Matheus Allan"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Seu e-mail</FormLabel>

                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemplo@gmail.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Seu celular</FormLabel>

                  <FormControl>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Finalizar cadastro'
              )}
            </Button>

            <Terms />
          </form>
        </Form>
      </div>
    </div>
  )
}

function Terms() {
  return (
    <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
      Ao continuar, você concorda com os nossos{' '}
      <a className="underline underline-offset-4" href="">
        termos de serviços
      </a>{' '}
      e{' '}
      <a className="underline underline-offset-4" href="">
        políticas de privacidade
      </a>
      .
    </p>
  )
}
