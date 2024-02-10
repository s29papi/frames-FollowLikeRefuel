import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;
  console.log(data)
    return new NextResponse(`<!DOCTYPE html><html><head>
        <title>Frame </title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmZPrZ45GrnmjbGw6Xj27mzgpju7FCguKAbwBkUVxBTPVB"/>
        <meta property="fc:frame:input:text" content="Destination Address" />
        <meta property="fc:frame:button:1" content="Enter" />
        <meta property="fc:frame:button:1:action" content="post"/>
        <meta property="fc:frame:post_url" content="https://socket-pay.vercel.app/api/send-frame?id=0"/>
      </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
