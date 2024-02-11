import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;
  // 3 responses

  // check here

  // if the interactive user hasn't followed and liked cast return 
  if (false) {
          return new NextResponse(`<!DOCTYPE html><html><head>
          <title>Like & Follow</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmRUEpTXSm2cjuDDgzS4pvXC9E9g2gtXuGVw8D3BCV5iup"/>
          <meta property="fc:frame:button:1" content="Refuel" />
          <meta property="fc:frame:button:1:action" content="post"/>
          <meta property="fc:frame:post_url" content="https://frames-follow-like-refuel.vercel.app/api/send-frame?id=0"/>
      </head></html>`);
  }
// if the interactive user hasn't liked cast return 
  if (false) {
        return new NextResponse(`<!DOCTYPE html><html><head>
        <title>Like Cast</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmfHYnG4NthhjZ684FLNTEtuiymiMcrmoQq164mZYkxKHa"/>
        <meta property="fc:frame:button:1" content="Refuel" />
        <meta property="fc:frame:button:1:action" content="post"/>
        <meta property="fc:frame:post_url" content="https://frames-follow-like-refuel.vercel.app/api/send-frame?id=0"/>
    </head></html>`);
  }

  if (false) {
        return new NextResponse(`<!DOCTYPE html><html><head>
        <title>Follow User</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmNskr3tpJpkBmT3aJzocfxgeWHQTjsFTz12Ms6M99w5DP"/>
        <meta property="fc:frame:button:1" content="Refuel" />
        <meta property="fc:frame:button:1:action" content="post"/>
        <meta property="fc:frame:post_url" content="https://frames-follow-like-refuel.vercel.app/api/send-frame?id=0"/>
    </head></html>`);
  }
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
