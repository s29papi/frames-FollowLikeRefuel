import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  // Step 3. Validate the message
  const { isValid, message } = await getFrameMessage(body, {neynarApiKey: "NEYNAR_ONCHAIN_KIT"});
  let following;
  let liked;
  if (message?.following) following = message?.following
  if (message?.liked) liked = message?.liked

  // if the interactive user hasn't followed and liked cast return 
  if (!liked && !following) {
          return new NextResponse(`<!DOCTYPE html><html><head>
          <title>Like & Follow</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmYfs8ZD3AGAXanmw1XXnDTWf4qGcueCT1JbJD78aJiLfL"/>
          <meta property="fc:frame:button:1" content="Refuel user address ${message?.interactor.verified_accounts[0]}" />
          <meta property="fc:frame:button:1:action" content="post"/>
          <meta property="fc:frame:post_url" content="https://frames-follow-like-refuel.vercel.app/api/frame"/>
      </head></html>`);
  }
// if the interactive user hasn't liked cast return 
  if (!liked && following) {
        return new NextResponse(`<!DOCTYPE html><html><head>
        <title>Like Cast</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmPqhyXZcfACp9K2uTGUpLxQK65xRWSydvpAdmJYU657Jf"/>
        <meta property="fc:frame:button:1" content="Refuel" />
        <meta property="fc:frame:button:1:action" content="post"/>
        <meta property="fc:frame:post_url" content="https://frames-follow-like-refuel.vercel.app/api/frame"/>
    </head></html>`);
  }

  if (liked && !following) {
        return new NextResponse(`<!DOCTYPE html><html><head>
        <title>Follow User</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmRUuy9hhNHLwCRkMHNeWXLZCpK8PB3eDuTUYN8pazbBhs"/>
        <meta property="fc:frame:button:1" content="Refuel" />
        <meta property="fc:frame:button:1:action" content="post"/>
        <meta property="fc:frame:post_url" content="https://frames-follow-like-refuel.vercel.app/api/frame"/>
    </head></html>`);
  }
  // in sedn frames, process refuel and return successful 
  //   return new NextResponse(`<!DOCTYPE html><html><head>
  //             <title>Input Wallet Address</title>
  //             <meta property="fc:frame" content="vNext" />
  //             <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmVfJeE5pEXPhALNSj7a7a2EJ9MDEG7MnhegQbBhFeMEVc"/>
  //             <meta property="fc:frame:input:text" content="Wallet Address..." />
  //             <meta property="fc:frame:button:1" content="Submit" />
  //             <meta property="fc:frame:button:1:action" content="post"/>
  //             <meta property="fc:frame:post_url" content="https://frames-follow-like-refuel.vercel.app/api/frame/refuel"/>
  // </head></html>`);

  return new NextResponse(`<!DOCTYPE html><html><head>
  <title>Success</title>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmXGeear4FPk4YAjU3hGTFZCSXi8dWV9oF9njxnyXCsGb5"/>
  <meta property="fc:frame:button:1" content="Success sent to ${message?.interactor.verified_accounts[0]} on Gnosis Chain  🎉" />
</head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
