import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'Send', action: 'post'},
      {label: 'Balance', action: 'post'},
      {label: 'Deposit or Withdraw', action: 'post_redirect'}
  ],
  image: 'https://rd-orpin.vercel.app/video.png',
  post_url: 'https://rd-orpin.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: 'Socket Pay',
  description: 'On-chain payments powered by Socket Bridge API',
  openGraph: {
    title: 'Socket Pay',
    description: 'A frame facilitating payments between facaster IDs',
    images: [`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmZPrZ45GrnmjbGw6Xj27mzgpju7FCguKAbwBkUVxBTPVB`],
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
          