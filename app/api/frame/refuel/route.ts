import { NextRequest, NextResponse } from 'next/server';
import {sendXdai} from './../refuel';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const searchParams = req.nextUrl.searchParams
  const address:any = searchParams.get("address")
  
  let sent = await sendXdai(address);
  console.log(sent)
  return new NextResponse(`<!DOCTYPE html><html><head>
  <title>Success</title>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmXGeear4FPk4YAjU3hGTFZCSXi8dWV9oF9njxnyXCsGb5"/>
  <meta property="fc:frame:button:1" content="Success 🎉" />
</head></html>`);

}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';




