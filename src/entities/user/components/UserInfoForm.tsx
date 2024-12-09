"use client";

import { useRouter } from "next/navigation";

import { AxiosResponse } from "axios";
import { Control, FieldValues, useForm } from "react-hook-form";

import InputField from "@/shared/components/Form/InputField";
import SelectCheckBox from "@/shared/components/Form/SelectCheckBox";
import STACK_LIST from "@/shared/constant/stackList";

const UserInfoFormField = {
  name: {
    label: "닉네임 (필수)",
    name: "name" as keyof UserInfoFormValues,
    required: true,
    rules: {
      required: "닉네임은 필수 항목입니다.",
      minLength: {
        value: 2,
        message: "닉네임은 최소 2글자 이상이어야 합니다.",
      },
      validate: {
        noWhiteSpace: (value: string | string[]) => {
          if (typeof value === "string") {
            return (
              value.trim().length >= 2 ||
              "닉네임은 공백을 제외한 2글자 이상이어야 합니다."
            );
          }
          return "잘못된 값입니다.";
        },
      },
    },
  },
  introduce: {
    label: "자기소개 (선택)",
    name: "introduce" as keyof UserInfoFormValues,
    required: false,
    rules: {
      maxLength: {
        value: 100,
        message: "자기소개는 최대 100자까지 입력 할 수 있습니다.",
      },
    },
  },
};

// 유저 정보 입력 폼 값의 타입
export interface UserInfoFormValues {
  name: string;
  introduce: string;
  stacks: string[];
}

// formActionHandler => 회원가입 & 수정하기 폼 액션
interface UserInfoFormProps {
  defaultValues?: UserInfoFormValues;
  isEdit?: boolean;
  formActionHandler: (
    data: UserInfoFormValues
  ) => Promise<AxiosResponse> | Promise<void>;
}

const UserInfoForm = ({
  defaultValues,
  isEdit,
  formActionHandler,
}: UserInfoFormProps) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    reset,
  } = useForm<UserInfoFormValues>({
    mode: "onTouched",
    defaultValues: defaultValues || {
      name: "",
      introduce: "",
      stacks: [],
    },
  });

  const onSubmit = async (data: UserInfoFormValues) => {
    // 닉네임이 유효하지 않을 때
    if (!data.name && data.name.length < 2) {
      setError("root", {
        message: "유효하지 않은 정보입니다. 다시 시도해주세요.",
      });
      reset();
      return;
    }

    try {
      await formActionHandler(data);
    } catch (error) {
      setError("root", {
        message: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center w-[500px]"
    >
      {/* 입력 필드 */}
      <div className="w-full space-y-4">
        {/* 유효하지 않은 입력값이 전송되었을 때 폼 에러 메세지 */}
        {errors.root?.message && (
          <p className="text-red-500 mb-4 text-center">{errors.root.message}</p>
        )}
      </div>

      {/* 닉네임 */}
      <InputField {...UserInfoFormField.name} control={control} />
      {/* 자기소개 */}
      <InputField {...UserInfoFormField.introduce} control={control} />

      {/* 기술스택 */}
      <div className="py-2 flex flex-col w-full">
        <div className="mb-2">기술스택 (선택)</div>
        <SelectCheckBox
          name="stacks"
          placeholder="사용가능한 기술스택을 선택해주세요."
          checkBoxList={STACK_LIST}
          control={control as unknown as Control<FieldValues>}
          maximum={8}
        />
      </div>

      {/* 폼 전송 버튼 */}
      <button
        className="bg-primary text-white w-full py-2 text-center mt-6 rounded-md hover:bg-opacity-85 disabled:bg-opacity-70 transition-colors disabled:cursor-not-allowed"
        disabled={!isValid || isSubmitting}
      >
        {isEdit ? "수정하기" : "제출하기"}
      </button>
    </form>
  );
};

export default UserInfoForm;
