import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
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
import { signIn } from '@/http/auth/sign-in'

const signInFormSchema = z.object({
  email: z
    .string({
      required_error: 'Informe o seu e-mail',
    })
    .email('Informe um e-mail válido'),
})

type signInFormData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const form = useForm<signInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn({ email }: signInFormData) {
    await authenticate(
      { email },
      {
        onSuccess: () => {
          toast.success('Enviamos um link de autenticação para seu e-mail', {
            description:
              'Acesse seu e-mail e clique no botão para acessar o painel',
          })
        },
        onError: () => {
          toast.error('Erro ao enviar e-mail', {
            description:
              'Não conseguimos enviar um e-mail para você entrar na aplicação',
            duration: 5000,
            action: {
              label: 'Reenviar',
              onClick: () => handleSignIn({ email }),
            },
          })
        },
      },
    )
  }

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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="flex flex-col gap-4"
          >
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

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Acessar painel'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
