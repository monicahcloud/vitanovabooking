Calendar Scheduling Booking Platform using Nextjs, Authjs, Nylas, Tailwind

Steps taken to create this application:

Create Next.js project
Create Dashboard
Onboarding Route
    - Authenticate user using Authjs + Nylas to connect with our Calendar
    - Nylas create the connection to out calendar and we get a grant ID & email in returne to authenticate all API requests
Create setting route
    -Change profile image and change name
Create Events Route
    -create/update/delete
Create Availability Route
Create booking form
    - unique URL with username
    - get adata from availability page get from Nylas display the correct data and available time frame
    - use Nylas to book the event in the calendar in our calendar and calendar from the attendee
Create the meetings route
    - see when, with whom and the meeting call provider
Create Landing Page