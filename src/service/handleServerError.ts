export const handleServerError = (error: any, functionName: string) => {
  console.error(`[❌ ${functionName}] 서버 요청 중 오류 발생:`, error);
  
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        console.warn("[⚠️ 401 Unauthorized] 인증이 필요합니다. 로그인 페이지로 이동해야 합니다.");
        return null; // 프론트엔드에서 로그인 페이지로 리디렉트 가능
      case 403:
        console.warn("[⚠️ 403 Forbidden] 접근 권한이 없습니다.");
        return null;
      case 404:
        console.warn("[⚠️ 404 Not Found] 요청한 리소스를 찾을 수 없습니다.");
        return null;
      case 500:
        console.error("[❌ 500 Internal Server Error] 서버에서 오류가 발생했습니다.");
        return null;
      default:
        console.error(`[❌ ${status} 오류]`, data?.message || "알 수 없는 오류 발생");
        return null;
    }
  } else if (error.request) {
    console.error("[❌ 서버 응답 없음] 네트워크 문제일 가능성이 높습니다.");
  } else {
    console.error("[❌ 요청 설정 오류]", error.message);
  }
  
  return null;
};