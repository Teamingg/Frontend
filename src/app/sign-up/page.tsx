import SignUpUserForm from "@/app/sign-up/_components/SignUpUserForm";

const SignUpPage = () => {
  return (
    <section className="flex justify-center items-center w-full h-full">
      {/* Desc */}
      <div className="bg-[#f5f5f5] bg-opacity-80 rounded-xl p-24">
        <p className="text-center mb-4">
          반갑습니다. <br />
          <span className="text-primary">티밍</span>을 이용하기에 앞서
          <span className="text-primary">간단한 회원정보</span>를 입력해주세요.
        </p>
        <SignUpUserForm />
      </div>
    </section>
  );
};

export default SignUpPage;
