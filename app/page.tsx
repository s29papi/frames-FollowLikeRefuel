import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'Send Eth', action: 'post'},
      {label: 'Get Eth Balance', action: 'post'},
      {label: 'Deposit or Withdraw', action: 'post_redirect'}
  ],
  image: 'https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmZPrZ45GrnmjbGw6Xj27mzgpju7FCguKAbwBkUVxBTPVB',
  post_url: 'https://rd-orpin.vercel.app/api/frame',
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

export default function Page() {
  return (
    <>
      <h1>Socket Pay</h1>
    </>
  );
}
          