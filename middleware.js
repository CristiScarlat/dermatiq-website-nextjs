import {NextResponse} from 'next/server';
import {jwtVerify} from 'jose';

export async function middleware(request) {
    const reqHeaders = new Headers(request.headers);
    const authHeader = reqHeaders.get('Authorization');
    if (authHeader) {
        try {
            const {payload} = await jwtVerify(authHeader.split(" ")[1], new TextEncoder().encode(process.env.API_SECRET_KEY))
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
    matcher: ['/api/hello', '/api/users']
}