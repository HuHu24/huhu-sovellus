import {NextRequest, NextResponse} from "next/server";
import {initFirebaseAdmin} from "@/firebaseAdmin";
import {auth} from "firebase-admin";
import {cookies} from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const result = (await request.json()) as {
            job: boolean
        }

        const session = cookies().get("session")?.value || ""
        if (!session) {
            return NextResponse.json({ claims: {} }, { status: 401 })
        }
        const decodedClaims = await auth().verifySessionCookie(session, true)

        await initFirebaseAdmin()

        const user = await auth().getUser(decodedClaims.uid)
        const customClaims = Object.assign({}, user.customClaims, {
            job: result.job
        })
        await auth().setCustomUserClaims(user.uid, customClaims)
    } catch (e) {
        return NextResponse.json(
            {
                message:
                    "Error occurred when processing custom claim. Check request body formatting and data",
            },
            { status: 400 }
        )
    }

    return NextResponse.json(
        { message:""},
        { status: 200 }
    )
}