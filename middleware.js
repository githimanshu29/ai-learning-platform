import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)'
]) //A utility from Clerk to define which routes are public (not protected by auth).






export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
}) //if route is not public, this middleware will block access to it, and then checks if the user is authenticated. If not, it will redirect them to the sign-in page.






export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}//Middleware Next.js ke har ek request pe nahi chalana chahiye. Kuch static files aur internal paths ko skip karna zaruri hota hai.