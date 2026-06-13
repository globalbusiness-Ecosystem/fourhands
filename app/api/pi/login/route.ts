import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { pi_auth_token } = await req.json();

    const res = await fetch("https://api.minepi.com/v2/me", {
      headers: { Authorization: `Bearer ${pi_auth_token}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Auth failed" }, { status: 401 });
    }

    const piUser = await res.json();

    return NextResponse.json({
      id: piUser.uid,
      username: piUser.username,
      credits_balance: 0,
      terms_accepted: true,
      app_id: process.env.PI_API_KEY,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
