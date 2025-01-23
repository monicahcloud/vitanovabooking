import { Button } from '@/components/ui/button'
import { type AriaButtonProps, useButton } from '@react-aria/button'
import { useFocusRing } from '@react-aria/focus'
import { mergeProps } from '@react-aria/utils'
import type { CalendarState } from '@react-stately/calendar'
import { useRef } from 'react'

export function CalendarButton(
  props: AriaButtonProps<'button'> & {
    state?: CalendarState
    side?: 'left' | 'right'
  }
) {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(props, ref) //
  const { focusProps, isFocusVisible } = useFocusRing() //provides styles when button is in focus

  return (
    <Button
      {...mergeProps(buttonProps, focusProps)} //mergeProps combines ARIA button props useButton and useFocusRing for seamless accessibility
      ref={ref}
      disabled={props.isDisabled}
      variant="outline"
      size="icon"
      className={isFocusVisible ? 'focus-visible-ring' : ''}
      aria-label={props['aria-label'] || 'Calendar Button'}
    >
      {props.children}
    </Button>
  )
}
