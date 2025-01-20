'use client'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import GoogleLogo from '@/public/google.svg'
import GitHubLogo from '@/public/github.svg'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

export function GoogleAuthButton() {
  //get pending state
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GoogleLogo} alt="Google Logo" className="size-4 mr-2" />{' '}
          Sign in with Google
        </Button>
      )}
    </>
  )
}

export function GitHubAuthButton() {
  //get pending state
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GitHubLogo} alt="GitHub Logo" className="size-4 mr-2" />{' '}
          Sign in with GitHub
        </Button>
      )}
    </>
  )
}
const SubmitButtons = () => {
  return <></>
}

export default SubmitButtons
