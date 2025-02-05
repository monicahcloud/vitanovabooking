
import * as React from 'react'
import { prisma } from '@/app/lib/prisma' // Importing Prisma client for database access.
import { Card, CardContent } from '@/components/ui/card' // UI components for layout and styling.
import { notFound } from 'next/navigation' // Utility for handling 404 responses.
import Image from 'next/image' // Next.js component for optimized image handling.
import { CalendarX2, Clock, VideoIcon } from 'lucide-react' // Icons for UI elements.
import { Separator } from '@/components/ui/separator' // UI component for visual separation.
import RenderCalendar from '@/app/components/bookingForm/RenderCalendar'
import TimeTable from '@/app/components/bookingForm/TimeTable'

// Define the shape of user data.
type UserData = {
  image: string | null
  name: string
  availability: { day: string; isActive: boolean }[]
}

// Define the shape of event type data.
type EventTypeData = {
  id: string
  description: string
  title: string
  duration: number
  videoCallSoftware: string | null
  user: UserData
}

// Function to fetch event data from the database.
async function getData(
  username: string,
  eventUrl: string
): Promise<EventTypeData | null> {
  try {
    const data = await prisma.eventType.findFirst({
      where: {
        url: eventUrl, // Match event URL.
        user: { userName: username }, // Match username.
        active: true, // Ensure the event is active.
      },
      select: {
        id: true,
        description: true,
        title: true,
        duration: true,
        videoCallSoftware: true,
        user: {
          select: {
            image: true,
            name: true,
            availability: { select: { day: true, isActive: true } }, // Select user availability.
          },
        },
      },
    })

    return data // Return fetched data.
  } catch (error) {
    console.error('Error fetching data:', error) // Log errors for debugging.
    return null // Return null if an error occurs.
  }
}
/*********************************************************************************************/

export default async function BookingFormRoute({
  params, // Destructure to get params directly
  searchParams, // Destructure to get searchParams
}: {
  params: { username: string; eventUrl: string }
  searchParams: { date?: string }
}) {
  // Fetch data using parameters.
  const data = await getData(params.username, params.eventUrl)

  if (!data) return notFound() // Return 404 if no data is found.

  // Parse the selected date and handle it as UTC.
  const selectedDate = searchParams.date
    ? new Date(`${searchParams.date}T00:00:00`) // Interpret the input date as UTC.
    : new Date() // Default to the current date.

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long', // Example: Monday
    year: 'numeric',
    month: 'long', // Example: January
    day: 'numeric', // Example: 23
    timeZone: 'UTC', // Ensure consistent UTC formatting.
  })

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[1000px] w-full mx-auto">
        <CardContent className="gap-4 p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
          <div>
            {/* User profile image */}
            <Image
              src={data.user?.image || '/default-profile.png'} // Fallback to default image if none is provided.
              alt={`${data.user?.name || 'User'}'s profile picture`} // Alt text for accessibility.
              className="rounded-full size"
              width={50}
              height={50}
            />

            {/* User name */}
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {data.user?.name}
            </p>

            {/* Event title */}
            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>

            {/* Event description */}
            <p className="text-sm font-medium text-muted-foreground">
              {data.description}
            </p>

            {/* Event details */}
            <div className="mt-5 flex flex-col gap-y-3">
              {/* Event date */}
              <p className="flex items-center">
                <CalendarX2 className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {formattedDate}
                </span>
              </p>

              {/* Event duration */}
              <p className="flex items-center">
                <Clock className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.duration} Minutes
                </span>
              </p>

              {/* Video call software */}
              <p className="flex items-center">
                <VideoIcon className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.videoCallSoftware || 'Not specified'}
                </span>
              </p>
            </div>
          </div>

          {/* Separator and calendar */}
          <Separator
            orientation="vertical"
            className="hidden md:block h-full w-[1px]"
          />
          {/* Pass user availability to RenderCalendar */}
          <RenderCalendar availability={data.user.availability} />
          <Separator
            orientation="vertical"
            className="hidden md:block h-full w-[1px]"
          />
          <TimeTable selectedDate={selectedDate} userName={params.username} />
        </CardContent>
      </Card>
    </div>
  )
}