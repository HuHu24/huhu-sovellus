import { NextRequest, NextResponse } from "next/server"
import {
  deleteRelease,
  initFirebaseAdmin,
  updateRelease,
  uploadRelease,
} from "@/firebaseAdmin"

async function handleRequest(request: NextRequest, action: Function) {
  await initFirebaseAdmin()
  const data = await request.json()
  await action(data)
}

export async function POST(request: NextRequest) {
  await handleRequest(request, uploadRelease)
  return NextResponse.json({ Created: "Created" }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  await handleRequest(request, updateRelease)
  return NextResponse.json({}, { status: 200 })
}

export async function DELETE(request: NextRequest) {
  await handleRequest(request, deleteRelease)
  return NextResponse.json({}, { status: 200 })
}
