'use client'
import dynamic from 'next/dynamic';

const OAuthCallback = dynamic(() => import('./OAuthCallback'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">로그인 처리 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  ),
  ssr: false
});

interface PageProps {
  params: Promise<{
    provider: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  return <OAuthCallback params={resolvedParams} searchParams={resolvedSearchParams} />;
} 