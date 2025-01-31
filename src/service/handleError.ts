const handleError = (status: number) => {
  let errorMessage = "잠시 후 다시 시도해주세요";

  switch (status) {
    case 500:
      errorMessage = "서버에서 데이터를 불러오지 못했습니다.";
      break;
    case 401:
      errorMessage =
        "인증 정보가 유효하지 않습니다. 로그인 후 다시 시도해주세요.";
      break;
    case 400:
      errorMessage = "잠시 후 다시 시도해주세요";
      break;
  }

  throw new Error(errorMessage);
};

export default handleError;
