import {NextRequest, NextResponse } from 'next/server'
import {cookies} from 'next/headers'
import {sign_out} from '@/firebase'


export async function GET(request: NextRequest) {
    cookies().delete('session')
    await sign_out()
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_URL}/huhu-sovellus/subcamp`, request.url))
}