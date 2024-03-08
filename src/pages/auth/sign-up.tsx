import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type signUpFormData = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<signUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  const handleSignUp = handleSubmit(async (data) => {
    console.log(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    reset()

    toast.success('Restaurante cadastrado', {
      description: 'O seu restaurante foi cadastrado com sucesso!',
      action: {
        label: 'Login',
        onClick: () => navigate('/sign-in'),
      },
    })
  })

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

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="restaurantName">Nome do restaurante</Label>
            <Input
              id="restaurantName"
              type="text"
              {...register('restaurantName')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" type="text" {...register('managerName')} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Seu celular</Label>
            <Input id="phone" type="tel" {...register('phone')} />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Finalizar cadastro'
            )}
          </Button>

          <Terms />
        </form>
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
