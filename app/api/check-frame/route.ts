import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams
  const id:any = searchParams.get("id")
  const idAsNumber = parseInt(id)

  let nextId = idAsNumber + 1

  if(idAsNumber === 1){
    return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Frame returns user Eth balance</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmZPrZ45GrnmjbGw6Xj27mzgpju7FCguKAbwBkUVxBTPVB"/>
    <meta property="fc:frame:input:text" content="Enter Address" />
    <meta property="fc:frame:button:1" content="Check Eth Balance" />
  </head></html>`);
  } 

return NextResponse.redirect('https://socket-pay.vercel.app/', {status: 302});
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';