'use client' // Ensures the component is a client-side component in a Next.js app.

import { useCalendar, useLocale } from 'react-aria' // Provides accessibility hooks for calendars.
import { useCalendarState } from 'react-stately' // Manages the state of the calendar.
import { createCalendar } from '@internationalized/date' // Utility to create a calendar based on the locale.
import { CalendarProps, DateValue } from '@react-types/calendar' // Type definitions for the calendar props.
import { CalendarHeader } from './CalendarHeader' // Header component for the calendar (includes navigation buttons).

/**
 * Calendar Component
 * Displays an accessible and internationalized calendar with ARIA and state management.
 *
 * @param props - CalendarProps<DateValue> containing configuration options for the calendar,
 * including selected date, minimum/maximum dates, and more.
 */
const Calendar = (props: CalendarProps<DateValue>) => {
  const { locale } = useLocale() // Retrieve the current locale for date formatting.

  // Initialize the calendar state using react-stately.
  const state = useCalendarState({
    ...props, // Spread props to allow customization (e.g., selected date, validation).
    visibleDuration: { months: 1 }, // Define the duration visible in the calendar (e.g., one month at a time).
    locale, // Pass the locale for proper date formatting.
    createCalendar, // Use the internationalized calendar creation utility.
  })

  // Generate ARIA properties for the calendar and navigation buttons.
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(
      props, // Calendar configuration and event handlers.
      state // State management for the calendar (e.g., current month, selected date).
    )

  return (
    // Root container for the calendar. Apply ARIA properties for accessibility.
    <div {...calendarProps} className="inline-block">
      {/* Render the calendar header with navigation buttons */}
      <CalendarHeader
        state={state} // Pass the calendar state for header rendering.
        calendarProps={calendarProps} // Include ARIA properties for the header.
        nextButtonProps={nextButtonProps} // Props for the "Next" button.
        prevButtonProps={prevButtonProps} // Props for the "Previous" button.
      />
    </div>
  )
}

export default Calendar // Export the component for use in other parts of the app.
