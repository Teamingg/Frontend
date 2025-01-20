"use client";
import {useForm, SubmitHandler, DefaultValues, Path, UseFormRegister} from "react-hook-form";
import TextareaField from "@/components/common/Input/TextArea/TextareaField";
import {
  ProjectCreationData,
  MentoringCreationData,
  FormSchema
} from "@/app/form/_type/formDataTypes";
import FormFieldRenderer from "@/app/form/_components/FormFieldRenderer";
import FormRowRenderer from "@/app/form/_components/FormRowRenderer";

interface Props<T extends ProjectCreationData | MentoringCreationData> {
  onSubmit: SubmitHandler<T>;
  defaultValues: DefaultValues<T>;
  formFields: (FormSchema)[];
  division?: "select" | "stacks";
}

type CustomErrors = {
  contents?: { message: string };
  content?: { message: string };
};

const CreateTeamForm = <T extends ProjectCreationData | MentoringCreationData> ({
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
      <TextareaField<ProjectCreationData>
        label="소개"
        name={"contents" as Path<ProjectCreationData>}
        placeholder="프로젝트 소개를 입력해 주세요."
        register={register as unknown as UseFormRegister<ProjectCreationData>}
        error={customErrors.contents?.message || customErrors.content?.message}
      />

      {/* 버튼 */}
      <div className="mt-16 text-center md:flex">
        <button className="w-[320px] h-[50px] mx-5 rounded-xl border-2 hover:bg-gray-400">
          닫기
        </button>
        <button className="w-[320px] h-[50px] mx-5 bg-blue-500 text-white rounded-xl hover:bg-blue-400">
          팀 생성하기
        </button>
      </div>
    </form>
  );
};

export default CreateTeamForm;
