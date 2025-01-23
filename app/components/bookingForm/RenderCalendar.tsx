'use client'

import Calendar from './Calendar'
import { today, getLocalTimeZone } from '@internationalized/date'
import {  DateValue } from '@react-types/calendar' // Type definitions for the calendar props.

interface iAppProps {
  availability: { day: string; isActive: boolean }[]
}

const RenderCalendar = ({ availability }: iAppProps) => {
  const isDataUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay()

   const adjustedIndex = dayOfWeek === 0 ? 6: dayOfWeek-1
   return !availability[adjustedIndex].isActive;
  }

  return (
    <>
      <Calendar
        minValue={today(getLocalTimeZone())}
        isDataUnavailable={isDataUnavailable}
      />
    </>
  )
}

export default RenderCalendar
