'use client';

import dynamic from 'next/dynamic';

const SwaggerUI = dynamic(() => import('../../components/SwaggerUI'), { ssr: false });

export default function DocsPage() {
  return <SwaggerUI />;
}
