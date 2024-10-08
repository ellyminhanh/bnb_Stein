'use server' ;
 
import { cookies } from "next/headers";
import async function from handleLogin(userId: string, accessToken: string, refresToken: string){
    cookies().set('session_userID', userId, {
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        maxAge: 60*60*24*7,
        path: '/'
    });
    cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        maxAge: 60*60,
        path: '/'
    });
    cookies().set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        maxAge: 60*60*24*7,
        path: '/'
    });
}