import { auth } from "firebase-admin"
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import {deleteRelease, initFirebaseAdmin, updateRelease} from "@/firebaseAdmin"
import { uploadRelease } from "@/firebaseAdmin";

export async function GET(request: NextRequest) {
    await initFirebaseAdmin()

    const session = cookies().get("session")?.value || ""

    //Validate if the cookie exist in the request
    if (!session) {
        return NextResponse.json({ claims: {} }, { status: 401 })
    }

    //Use Firebase Admin to validate the session cookie
    const decodedClaims = await auth().verifySessionCookie(session, true)

    if (!decodedClaims) {
        return NextResponse.json({ claims: {} }, { status: 401 })
    }

    const user = await auth().getUser(decodedClaims.uid)

    return NextResponse.json(
        {user:user },
        { status: 200 }
    )
}

export async function POST(request: NextRequest) {
    await initFirebaseAdmin()

    const session = cookies().get("session")?.value
    if (!session) return NextResponse.json({ claims: {} }, { status: 401 })

    const decodedClaims = await auth().verifySessionCookie(session, true)
    if (!decodedClaims) return NextResponse.json({ claims: {} }, { status: 401 })

    const user = await auth().getUser(decodedClaims.uid)
    if (!(user.customClaims?.admin || user.customClaims?.subcampLeader)) {
        return NextResponse.json({ message: "permissions required" }, { status: 403 })
    }
    const data = await request.json()
    console.log(data)
    const a = await uploadRelease(data)
    console.log(a)

    return NextResponse.json({Created: "Created"}, { status: 201 })
}
export async function PUT(request: NextRequest) {
    await initFirebaseAdmin()

    const session = cookies().get("session")?.value
    if (!session) return NextResponse.json({ claims: {} }, { status: 401 })

    const decodedClaims = await auth().verifySessionCookie(session, true)
    if (!decodedClaims) return NextResponse.json({ claims: {} }, { status: 401 })

    const user = await auth().getUser(decodedClaims.uid)
    if (!(user.customClaims?.admin || user.customClaims?.subcampLeader)) {
        return NextResponse.json({ message: "permissions required" }, { status: 403 })
    }
    const data = await request.json()
    console.log(data)
    const a = await updateRelease(data)
    console.log(a)

    return NextResponse.json({}, { status: 200 })
}
export async function DELETE(request: NextRequest) {
    await initFirebaseAdmin()

    const session = cookies().get("session")?.value
    if (!session) return NextResponse.json({ claims: {} }, { status: 401 })

    const decodedClaims = await auth().verifySessionCookie(session, true)
    if (!decodedClaims) return NextResponse.json({ claims: {} }, { status: 401 })

    const user = await auth().getUser(decodedClaims.uid)
    if (!(user.customClaims?.admin || user.customClaims?.subcampLeader)) {
        return NextResponse.json({ message: "permissions required" }, { status: 403 })
    }
    const id = await request.json()
    const a = await deleteRelease(id)
    console.log(a)

    return NextResponse.json({}, { status: 200 })
}