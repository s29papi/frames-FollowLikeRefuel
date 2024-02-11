import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  // in sedn frames, process refuel and return successful 
    return new NextResponse(`<!DOCTYPE html><html><head>
              <title>Input Wallet Address</title>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmVQGtDeK7eLFa3oDdqGXF24rvezH4hXkjPkVQSkL22giS"/>
              <meta property="fc:frame:input:text" content="Wallet Address..." />
              <meta property="fc:frame:button:1" content="Submit" />
              <meta property="fc:frame:button:1:action" content="post"/>
              <meta property="fc:frame:post_url" content="https://frames-follow-like-refuel.vercel.app/api/frame/refuel?id=0"/>
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
