'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { OnboardingAction } from '../actions'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { onboardingSchema } from '../lib/zodSchemas'
import { useActionState } from 'react'
import { SubmitButton } from '../components/SubmitButtons'

export default function OnboardingRoute() {
  const [lastResult, action] = useActionState(OnboardingAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      })
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  return (
    <>
      <div className="min-h-screen w-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>
              Welcome to VitaNova<span className="text-primary">Designs</span>
            </CardTitle>
            <CardDescription>
              We need the following information to set up your profile!
            </CardDescription>
          </CardHeader>
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            noValidate
          >
            <CardContent className="grid gap-y-5">
              <div className="grid gap-y-2">
                <Label>Full Name</Label>
                <Input
                  placeholder="Enter your full name"
                  name={fields.fullName.name}
                  defaultValue={fields.fullName.initialValue}
                  key={fields.fullName.key}
                />
                <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
              </div>
              <div className="grid gap-y-2">
                <Label>UserName</Label>
                <div className="flex rounded-md">
                  <span className=" inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                    vitanovadesigns.cloud
                  </span>
                  <Input
                    placeholder="Enter Username"
                    name={fields.userName.name}
                    key={fields.userName.key}
                    defaultValue={fields.userName.initialValue}
                    className="rounded-l-none"
                  />
                  <p className="text-red-500 text-sm">
                    {fields.userName.errors}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
             <SubmitButton text='Submit' className='w-full'/>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  )
}
