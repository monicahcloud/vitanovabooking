import { useRef } from 'react'
import { mergeProps, useCalendarCell, useFocusRing } from 'react-aria'
import { CalendarDate, isToday , getLocalTimeZone} from '@internationalized/date'
import type { CalendarState } from '@react-stately/calendar'
import { cn } from '@/lib/utils'

const CalendarCell = ({
  state,
  date,
  currentMonth,
}: {
  state: CalendarState
  date: CalendarDate
  currentMonth: CalendarDate
}) => {
  const ref = useRef(null)

  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref)

  const { focusProps, isFocusVisible } = useFocusRing()
  const isDateToday = isToday(date, getLocalTimeZone())
  return (
    <>
      <td
        {...cellProps}
        className={`py-0.5 px-0.5 relative  ${isFocusVisible ? 'z-10' : 'z-0'}`}
      >
        <div
          {...mergeProps(buttonProps, focusProps)}
          ref={ref}
          hidden={isOutsideVisibleRange}
          className="size-10 sm:size-12 outline-none group rounded-md"
        >
          <div
            className={cn(
              'size-full rounded-sm flex items-center justify-center text-sm font-semibold',
              isDisabled ? 'text-muted-foreground cursor-not-allowed' : '',
              isSelected ? 'bg-primary text-white' : '',
              !isSelected && !isDisabled ? 'hover:bg-primary/10' : ''
            )}
          >
            {formattedDate}
            {isDateToday && (
              <div
                className={cn(
                  'absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full',
                  isSelected && 'bg-white'
                )}
              />
            )}
          </div>
        </div>
      </td>
    </>
  )
}

export default CalendarCell
