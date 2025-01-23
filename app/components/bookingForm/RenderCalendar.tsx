'use client'

import Calendar from './Calendar'
import {today, getLocalTimeZone} from '@internationalized/date'

const RenderCalendar = () => {
  return (
    <>
      <Calendar minValue={today(getLocalTimeZone())}/>
    </>
  )
}

export default RenderCalendar
