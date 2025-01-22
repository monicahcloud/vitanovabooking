import { updateAvailabilityAction } from '@/app/actions'
import { SubmitButton } from '@/app/components/SubmitButtons'
import { requireUser } from '@/app/lib/hooks'
import { prisma } from '@/app/lib/prisma'
import { times } from '@/app/lib/times'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Day } from '@prisma/client'

import { notFound } from 'next/navigation'

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  })

  if (!data) {
    return notFound()
  }
  return data
}

export default async function Availability() {
  const session = await requireUser()
  const data = await getData(session.user?.id as string)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>Manage your Availability</CardDescription>
        </CardHeader>
        <form action={updateAvailabilityAction}>
          <CardContent className="flex flex-col gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
              >
                <input
                  type="hidden"
                  className=""
                  name={`id-${item.id}`}
                  value={item.id}
                />
                <div className="flex items-center gap-3">
                  <Switch
                    name={`isActive-${item.id}`}
                    defaultChecked={item.isActive}
                  />
                  <p>{item.day}</p>
                </div>
                <Select
                  name={`fromTime-${item.id}`}
                  defaultValue={item.fromTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="From Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => (
                        <SelectItem value={time.time} key={time.id}>
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  name={`tillTime-${item.id}`}
                  defaultValue={item.tillTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="To Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => (
                        <SelectItem value={time.time} key={time.id}>
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <SubmitButton text="Save Changes" />
          </CardFooter>
        </form>
      </Card>
    </>
  )
}
