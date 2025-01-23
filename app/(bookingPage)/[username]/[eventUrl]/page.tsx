import { prisma } from '@/app/lib/prisma' // Importing Prisma client for database access.
import { Card, CardContent } from '@/components/ui/card' // UI components for layout and styling.
import { notFound } from 'next/navigation' // Utility for handling 404 responses.
import Image from 'next/image' // Next.js component for optimized image handling.
import { CalendarX2, Clock, VideoIcon } from 'lucide-react' // Icons for UI elements.
import { Separator } from '@/components/ui/separator' // UI component for visual separation.
import Calendar from '@/app/components/bookingForm/Calendar' // Calendar component for booking interface.

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

// Booking form route component.
export default async function BookingFormRoute({
  params,
}: {
  params: { username: string; eventUrl: string }
}) {
  const data = await getData(params.username, params.eventUrl) // Fetch data using parameters.

  if (!data) return notFound() // Return 404 if no data is found.

  // Format the current date to include the year.
  const currentDate = new Date() // Get the current date.
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[1000px] w-full mx-auto">
        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
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
          <Calendar />
          <Separator
            orientation="vertical"
            className="hidden md:block h-full w-[1px]"
          />
        </CardContent>
      </Card>
    </div>
  )
}
