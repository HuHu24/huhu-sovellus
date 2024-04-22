import {NextRequest,NextResponse} from "next/server";
import {subscribeToTopic} from "@/firebaseAdmin";

export async function POST(request: NextRequest) {
    try {
        const result = (await request.json()) as { subcamp: number; token: string }

        await Promise.all([
            subscribeToTopic(result.token, result.subcamp.toString()),
            subscribeToTopic(result.token, "Kaikki"),
        ])


        return NextResponse.json("Notification enabled"), {status: 200}
    } catch (error) {
        console.error(error)
        return NextResponse.json("Something went wrong")
    }
}