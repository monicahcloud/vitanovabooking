import { useCalendarGrid, useLocale } from 'react-aria'
import {
  getWeeksInMonth,
  DateDuration,
  endOfMonth,
} from '@internationalized/date'
import { CalendarState } from 'react-stately'
import CalendarCell from './CalendarCell'
import { DateValue } from '@react-types/calendar'

const CalendarGrid = ({
  state,
  offset = {},
  isDataUnavailable,
}: {
  state: CalendarState
  offset?: DateDuration
  isDataUnavailable?: (date: DateValue) => boolean
}) => {
  const startDate = state.visibleRange.start.add(offset)
  const endDate = endOfMonth(startDate)
  const { locale } = useLocale()

  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
      weekdayStyle: 'short',
    },
    state
  )

  const weeksInMonth = getWeeksInMonth(startDate, locale)

  return (
    <table {...gridProps} cellPadding={0} className="flex-1">
      <thead {...headerProps} className="text-sm font-medium">
        <tr className="">
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    isUnavailable={isDataUnavailable?.(date)}
                    currentMonth={startDate}
                  />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CalendarGrid
