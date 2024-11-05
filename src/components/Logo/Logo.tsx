import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  width?: string;
};

const Logo = ({ width = '120px' }: Props) => {
  return (
    <Link
      href={'/'}
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBlock: '2px',
      }}
    >
      <Image
        src={'/logo/ubrealty.svg'}
        alt='ubrealty'
        width={0}
        height={0}
        sizes='100%'
        style={{ width, height: '100%' }}
      />
    </Link>
  );
};

export default Logo;
