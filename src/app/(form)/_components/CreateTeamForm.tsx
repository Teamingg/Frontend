"use client";
import {useForm, SubmitHandler, DefaultValues, Path, UseFormRegister} from "react-hook-form";
import TextareaField from "@/components/common/Input/TextArea/TextareaField";
import {ProjectForm, MentoringForm, ProjectFormData, MentoringFormData} from "@/app/(form)/_type/createFormData";
import FormFieldRenderer from "@/app/(form)/_components/FormFieldRenderer";
import FormRowRenderer from "@/app/(form)/_components/FormRowRenderer";

interface Props<T extends ProjectFormData | MentoringFormData> {
  onSubmit: SubmitHandler<T>;
  defaultValues: DefaultValues<T>;
  formFields: (ProjectForm | MentoringForm)[];
  division?: "select" | "stacks";
}

type CustomErrors = {
  contents?: { message: string };
  content?: { message: string };
};

const CreateTeamForm = <T extends ProjectFormData | MentoringFormData> ({
  onSubmit,
  defaultValues,
  formFields,
  division
}: Props<T>) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    defaultValues: defaultValues as unknown as DefaultValues<T>
  });

  const customErrors = errors as CustomErrors;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field, index) =>
          "row" in field ? (
              <FormRowRenderer
                  key={index}
                  rowFields={field.row}
                  control={control}
                  register={register}
                  division={division}
              />
          ) : (
              <FormFieldRenderer
                  key={index}
                  field={field}
                  control={control}
                  register={register}
                  division={division}
              />
          )
      )}

      {/* 소개 */}
      <TextareaField<ProjectFormData>
        label="소개"
        name={"contents" as Path<ProjectFormData>}
        placeholder="프로젝트 소개를 입력해 주세요."
        register={register as unknown as UseFormRegister<ProjectFormData>}
        error={customErrors.contents?.message || customErrors.content?.message}
      />

      {/* 버튼 */}
      <div className="mt-16 text-center">
        <button className="w-[320px] h-[50px] mx-5 rounded-l border-2">
          닫기
        </button>
        <button className="w-[320px] h-[50px] mx-5 bg-blue-500 text-white rounded-[5px]">
          팀 생성하기
        </button>
      </div>
    </form>
  );
};

export default CreateTeamForm;
