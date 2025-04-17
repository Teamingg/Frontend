"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const OAuthCallbackPage = ({ params }: { params: { provider: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state) {
      // 서버로 인증 코드 전송 (GET 요청으로 변경)
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/oauth2/code/${params.provider}?code=${code}&state=${state}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Authentication failed");
        })
        .then((data) => {
          if (data.accessToken) {
            // 토큰이 성공적으로 발급된 경우
            router.push("/");
          } else {
            throw new Error("No access token received");
          }
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          router.push("/login?error=auth_failed");
        });
    } else {
      router.push("/login?error=invalid_params");
    }
  }, [params.provider, router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">로그인 처리 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default OAuthCallbackPage; 