import React from 'react'
import { format, fromUnixTime, parse } from 'date-fns'
import { prisma } from '@/app/lib/prisma'
import { Prisma } from '@prisma/client'
import { nylas } from '@/app/lib/nylas'
import { GetFreeBusyRequest, NylasResponse } from 'nylas'

async function getData(userName: string, selectedDate: Date) {
  const currentDay = format(selectedDate, 'EEEE')
  const startOfDay = new Date(selectedDate)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(selectedDate)
  endOfDay.setHours(23, 59, 59, 999)

  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Prisma.EnumDayFilter,
      user: {
        userName: userName,
      },
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
      user: {
        select: {
          grantEmail: true,
          grantID: true,
        },
      },
    },
  })
  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.user?.grantID as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data?.user.grantEmail as string],
    },
  })
  return { data, nylasCalendarData }
}

interface iAppProps {
  selectedDate: Date
  userName: string
}

function calculateAvailableTimeSlots(
  date: string,
  dbAvailability: {
    fromTime: string | undefined
    tillTime: string | undefined
  },
  nylasData: NylasResponse<GetFreeBusyRequest[]>
) {
  const now = new Date()

  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`,
    'yyyy-mm-dd HH:mm',
    new Date()
  );

  const availableTill = parse(
    `${date} ${dbAvailability.tillTime}`,
    'yyyy-mm-dd HH:mm',
    new Date()
  );

  const busySlots = nylasData.data[0].timeSlots.map((slot) => (
    {
        start: fromUnixTime(slot.startTime),
        end: fromUnixTime(slot.endTime)
    }
  ))
}

const TimeTable = async ({ selectedDate, userName }: iAppProps) => {
  const { data, nylasCalendarData } = await getData(userName, selectedDate)
  console.log(nylasCalendarData.data[0].timeSlots)

  return (
    <div>
      <p className="text-base font-semibold ">
        {format(selectedDate, 'EEE')}{' '}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, 'MMM. d')}
        </span>
      </p>
    </div>
  )
}

export default TimeTable
