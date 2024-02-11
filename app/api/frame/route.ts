import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;
  // 3 responses
  if (false) {
          return new NextResponse(`<!DOCTYPE html><html><head>
          <title>Frame </title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://frames-follow-like-refuel.vercel.app/api/og"/>
          <meta property="fc:frame:input:text" content="Enter Address.." />
          <meta property="fc:frame:button:1" content="Submit" />
          <meta property="fc:frame:button:1:action" content="post"/>
          <meta property="fc:frame:post_url" content="https://frames-follow-like-refuel.vercel.app/api/send-frame?id=0"/>
        </head></html>`);
  }
      return new NextResponse(`<!DOCTYPE html><html><head>
                <title>Like & Follow</title>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmRUEpTXSm2cjuDDgzS4pvXC9E9g2gtXuGVw8D3BCV5iup"/>
                <meta property="fc:frame:button:1" content="Refuel" />
                <meta property="fc:frame:button:1:action" content="post"/>
                <meta property="fc:frame:post_url" content="https://frames-follow-like-refuel.vercel.app/api/send-frame?id=0"/>
    </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
