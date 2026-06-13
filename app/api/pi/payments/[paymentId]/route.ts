import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  const { paymentId } = await params;
  const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}`, {
    headers: {
      Authorization: `Key ${process.env.PI_API_KEY}`,
    },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
