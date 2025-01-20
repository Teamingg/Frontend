import React from 'react';
import {HashLoader} from "react-spinners";

type spinner = React.ReactNode;

// 무난한 디자인으로 넣었는데 바꾸셔도 됩니다.
// https://www.davidhu.io/react-spinners/
const LoadingSpinner = () => {
  return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <HashLoader />
        <h3>데이터를 불러오고 있습니다.</h3>
      </div>
  );
};

export default LoadingSpinner;