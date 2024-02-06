import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { sql } from '@vercel/postgres';

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'Send Eth', action: 'post'},
      {label: 'Get Eth Balance', action: 'post'},
      // {label: 'Link fid to address', action: 'post_redirect'}
  ],
  image: 'https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmZPrZ45GrnmjbGw6Xj27mzgpju7FCguKAbwBkUVxBTPVB',
  post_url: 'https://socket-pay.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: 'Socket Pay',
  description: 'On-chain payments powered by Socket Bridge API',
  openGraph: {
    title: 'Socket Pay',
    description: 'A frame facilitating payments between facaster IDs',
    images: [`https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmZPrZ45GrnmjbGw6Xj27mzgpju7FCguKAbwBkUVxBTPVB`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
  try {
    // Query to check if the table exists
    const tableExistsResult: any = await sql`
      SELECT EXISTS (
          SELECT 1
          FROM   information_schema.tables 
          WHERE  table_name = 'userInfo'
      ) AS table_exists;
    `;

    // Extract the result from the query
    const tableExists = tableExistsResult[0].table_exists;

    // Check if the table exists
    if (tableExists) {
      return (<> <h1>Socket Pay</h1></>)
    } else {
      await sql`
            CREATE TABLE userInfo (
              userIdx SERIAL PRIMARY KEY,
              DestinationAddress VARCHAR(255),
              DestinationChain VARCHAR(255),
              SourceChain VARCHAR(255),
              Amount VARCHAR(255) 
            );
          `;
      return (
        <>
          <h1>Socket Pay</h1>
        </>
      );
    }
  } catch (error) {}
}


// ref: https://www.pinata.cloud/blog/how-to-make-a-frame-on-farcaster-using-ipfs