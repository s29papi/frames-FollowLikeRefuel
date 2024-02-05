import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;
  if (buttonId === 1){ 
    // To-update this code to handle the scenario of a user who hasn't linked his address yet 
    // but for now we give it a free pass 
    return new NextResponse(`<!DOCTYPE html><html><head>
        <title>Frame Sends Eth</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmZPrZ45GrnmjbGw6Xj27mzgpju7FCguKAbwBkUVxBTPVB"/>
        <meta property="fc:frame:button:1" content="Select Destination Chain" />
        <meta property="fc:frame:button:1:action" content="post"/>
        <meta property="fc:frame:post_url" content="https://socket-pay.vercel.app/api/send-frame?id=1"/>

      </head></html>`);
  }
  if (buttonId === 2){ 
    return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Select the Destination chain...</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmZPrZ45GrnmjbGw6Xj27mzgpju7FCguKAbwBkUVxBTPVB"/>
    <meta property="fc:frame:button:1" content="Ethereum" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:button:2" content="Arbitrum" />
    <meta property="fc:frame:button:2:action" content="post" />
    <meta property="fc:frame:button:3" content="Optimism" />
    <meta property="fc:frame:button:3:action" content="post" />
    <meta property="fc:frame:post_url" content="https://socket-pay.vercel.app/api/check-frame?id=1" />
  </head></html>`);
  }
  if (buttonId === 3){ 
    return NextResponse.redirect('https://socket-pay.vercel.app/redirect', {status: 302});
  }
  return NextResponse.redirect('https://socket-pay.vercel.app/', {status: 302});
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
