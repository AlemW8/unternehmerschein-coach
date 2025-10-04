import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes die Login erfordern (NUR Admin & Prüfung & Profil)
const protectedRoutes = [
  '/exam',
  '/profile',
  '/admin'
]

// Public routes die IMMER zugänglich sind (inkl. /learn)
const publicRoutes = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/pricing',
  '/learn'  // Learn ist jetzt öffentlich!
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Check if the path is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  )
  
  // Get auth token from cookie or localStorage (via header)
  const authHeader = request.headers.get('authorization')
  const authCookie = request.cookies.get('auth_token')
  const isAuthenticated = !!(authHeader || authCookie)
  
  // Redirect to signin if trying to access protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }
  
  // KEIN Redirect zu /learn - User bleibt wo er ist
  // if (isAuthenticated && pathname.startsWith('/auth/')) {
  //   return NextResponse.redirect(new URL('/learn', request.url))
  // }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (meta files)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|data|manifest.json|sw.js|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}
