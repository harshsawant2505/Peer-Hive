import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  
  
   const token =req.cookies.get('__Secure-next-auth.session-token')?.value || req.cookies.get('next-auth.session-token')?.value;


 const path = req.nextUrl.pathname

 const publicPath = path === '/register' || path === '/login' || path == '/landing'
  

 

 if (publicPath && token) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
 }
 if (!publicPath && !token) {
   return NextResponse.redirect(new URL('/landing', req.nextUrl))
}

}


// Add the page paths u need only authenticated people can access
export const config = {
  matcher: [
    
    '/',
    '/login',
    '/landing',
    '/profile',
   
    ]
}