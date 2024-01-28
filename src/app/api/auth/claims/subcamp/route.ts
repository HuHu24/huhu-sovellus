import { auth } from "firebase-admin"
import { NextRequest, NextResponse } from "next/server"
import { getUid } from "@/firebaseAdmin";

export async function POST(request: NextRequest) {
    try {
        const result = (await request.json()) as { subcamp: number }
        //Check that the subcamp value is valid
        if (!result.subcamp || result.subcamp < 1 || result.subcamp > 6) {
            return NextResponse.json(
                {
                    message:
                        "Error occurred when processing custom claim. Check request body formatting and data",
                },
                { status: 400 }
            )
        }
       const uid = await getUid(request);
        //Check that the uid is valid
        if (!uid) {
            return NextResponse.json(
                {
                    message: "There was an error with ur session",
                },
                { status: 400 }
            )
        }
        await auth().setCustomUserClaims(uid, { subcamp: result.subcamp })

        // Return the selected subcamp
        return NextResponse.json(
            {
                message: "Subcamp selected",
                subcamp: result.subcamp
            },
            { status: 200 }
        )
    } catch (e) {
        return NextResponse.json(
            {
                message:
                    "Error occurred when processing custom claim. Check request body formatting and data",
            },
            { status: 400 }
        )
    }
}

export async function GET(request: NextRequest) {;
    return NextResponse.json({},
        { status: 400 })
}