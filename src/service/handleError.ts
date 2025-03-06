const handleError = (status: number, customMessage?: string) => {
  let errorMessage = "잠시 후 다시 시도해주세요."; // 기본 오류 메시지
  
  switch (status) {
    case 400:
      errorMessage = "잘못된 요청입니다. 입력값을 확인해주세요.";
      break;
    case 401:
      errorMessage = "인증 정보가 유효하지 않습니다. 로그인 후 다시 시도해주세요.";
      break;
    case 403:
      errorMessage = "접근 권한이 없습니다.";
      break;
    case 404:
      errorMessage = "요청하신 데이터를 찾을 수 없습니다.";
      break;
    case 408:
      errorMessage = "요청 시간이 초과되었습니다. 네트워크 상태를 확인해주세요.";
      break;
    case 429:
      errorMessage = "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
      break;
    case 500:
      errorMessage = "서버에서 데이터를 불러오지 못했습니다.";
      break;
    case 502:
      errorMessage = "서버 게이트웨이 오류가 발생했습니다.";
      break;
    case 503:
      errorMessage = "서버가 현재 점검 중이거나 과부하 상태입니다.";
      break;
    case 504:
      errorMessage = "서버 응답 시간이 초과되었습니다.";
      break;
    default:
      errorMessage = "예기치 않은 오류가 발생했습니다.";
      break;
  }
  
  // 커스텀 메시지가 있다면 덮어쓰기
  if (customMessage) {
    errorMessage = customMessage;
  }
  
  console.error(`[❌ ERROR ${status}] ${errorMessage}`);
  throw new Error(errorMessage);
};

export default handleError;