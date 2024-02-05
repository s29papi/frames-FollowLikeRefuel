import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams
  const id:any = searchParams.get("id")
  const idAsNumber = parseInt(id)

  const nextId = idAsNumber + 1

  if(idAsNumber === 1){
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
    <meta property="fc:frame:button:2" content="Starknet" />
    <meta property="fc:frame:button:2:action" content="post" />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/end" />
  </head></html>`);
  } 
  
  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is frame ${id}</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/Qme4FXhoxHHfyzTfRxSpASbMF8kajLEPkRQWhwWu9pkUjm/${id}.png" />
    <meta property="fc:frame:button:1" content="Next Page" />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${nextId}" />
  </head></html>`);

}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';