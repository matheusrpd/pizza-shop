import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInFormSchema = z.object({
  email: z.string().email(),
})

type signInFormData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  const handleSignIn = handleSubmit(async (data) => {
    console.log(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success('Enviamos um link de autenticação para seu e-mail', {
      description: 'Acesse seu e-mail e clique no botão para acessar o painel',
    })
  })

  return (
    <div className="w-full p-8">
      <Helmet title="Login" />

      <Button asChild variant="ghost" className="absolute right-8 top-8">
        <Link to="/sign-up">Novo estabelecimento</Link>
      </Button>

      <div className="mx-auto flex w-full max-w-sm flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acesar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Acessar painel'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
