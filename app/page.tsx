import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';


const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'Refuel', action: 'post'},
  ],
  image: 'https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmaCuMwTH22dJXSmow4VUVcjPruUq8uXDSA1rTrLs8gDVm',
  post_url: 'https://frames-follow-like-refuel.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: 'Refuel-Frame by socket.',
  description: 'Follow this user, Like the post, and Refuel.',
  metadataBase: new URL('https://frames-follow-like-refuel.vercel.app'),
  openGraph: {
    title: 'Refuel-Frame by socket.',
    description: 'Follow this user, Like the post, and Refuel.',
    images: [`https://magenta-hollow-tiglon-795.mypinata.cloud/ipfs/QmaCuMwTH22dJXSmow4VUVcjPruUq8uXDSA1rTrLs8gDVm`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
  return (
    <>
      <h1>Refuel-Frame by socket.</h1>
    </>
  );
}


// ref: https://www.pinata.cloud/blog/how-to-make-a-frame-on-farcaster-using-ipfs
// spec: https://docs.farcaster.xyz/reference/frames/spec
// playground: https://og-playground.vercel.app/

