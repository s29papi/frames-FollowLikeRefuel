import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;
  if (buttonId === 1){ 
    return new NextResponse(`<!DOCTYPE html><html><head>
        <title>Frame Sends Eth</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmZPrZ45GrnmjbGw6Xj27mzgpju7FCguKAbwBkUVxBTPVB" />
        <meta property="fc:frame:input:text" content="Enter Amount Eth" />
        <meta property="fc:frame:button:1" content="Send" />
      </head></html>`);
  }
  if (buttonId === 2){ 
      return new NextResponse(`<!DOCTYPE html><html><head>
      <title>Frame returns user Eth balance</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmZPrZ45GrnmjbGw6Xj27mzgpju7FCguKAbwBkUVxBTPVB" />
      <meta property="fc:frame:input:text" content="Enter FID or /username" />
      <meta property="fc:frame:button:1" content="Check Eth Balance" />
    </head></html>`);
  }
  if (buttonId === 3){ 
    return NextResponse.redirect('https://rd-orpin.vercel.app/redirect', {status: 302});
  }
  return NextResponse.redirect('https://rd-orpin.vercel.app', {status: 302});
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
