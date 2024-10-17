'use server';

import { cookies } from "next/headers";

// Correct function syntax for async
export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    // Set cookies for userId
    cookies().set('session_userID', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookie in production
        maxAge: 60 * 60 * 24 * 7, // Cookie lasts for 7 days
        path: '/' // Accessible across the whole site
    });

    // Set cookies for access token
    cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // Cookie lasts for 1 hour
        path: '/'
    });

    // Set cookies for refresh token
    cookies().set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // Cookie lasts for 7 days
        path: '/'
    });
}

export async function resetAuthCookies () {
    cookies().set('session_userID','');
    cookies().set('session_acc','');
    cookies().set('session_refresh_token','');
}


export async function getUserID() {
    const userID = cookies().get('session_userID')?.value
    return userID ? userID : null 
}


export async function getAcessToken(){
    let accessToken = cookies().get('session_access_token')?.value;
    return accessToken;
}