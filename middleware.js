import {NextResponse} from 'next/server';
import {jwtVerify} from 'jose';


export async function middleware(request) {
    if (request.method === "OPTIONS") {
        return NextResponse.json({status: 200}); // Respond with 200 to OPTIONS requests
    }
    const token = request.cookies.get("token")?.value;
    if (token) {
        try {
            const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.API_SECRET_KEY))
            const modifiedReq = NextResponse.next();
            modifiedReq.headers.set('x-user-name', payload.username);
            return modifiedReq;
        } catch (error) {
            return NextResponse.json({success: false, message: error.message}, {status: 401})
        }
    } else {
        return NextResponse.json(
            {success: false, message: 'authentication failed'},
            {status: 401}
        )
    }
}

export const config = {
    matcher: ['/api/users/:path*', '/admin/dashboard']
}