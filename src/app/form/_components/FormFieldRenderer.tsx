import {FormSchema} from "@/types/form";
import {Control, FieldValues, UseFormRegister, Path} from "react-hook-form";
import SelectCheckBox from "@/components/Input/SelectCheckBox/SelectCheckBox";
import STACK_LIST from "@/constant/stackList";
import InputField from "@/components/Input/TextInput/InputField";

interface FieldRendererProps<T extends FieldValues> {
  field: FormSchema;
  control: Control<T>;
  register: UseFormRegister<T>;
  division?: "select" | "stacks";
}

const FormFieldRenderer = <T extends FieldValues>({
  field,
  control,
  register,
  division
}: FieldRendererProps<T>) => {
  // row 가 존재하는 경우, 처리하지 않고 반환
  if ("row" in field) {
    return null; // 혹은 별도의 컴포넌트에서 처리
  }

  if ("options" in field && division === "select") {
    return (
        <div className="w-full">
          <label htmlFor={field.name} className="block mb-2">
            {field.label}
          </label>
          <select {...register(field.name as Path<T>)} id={field.name} className="w-full p-2 border block">
            {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
            ))}
          </select>
        </div>
    );
  }

  if ("options" in field && division === "stacks") {
    return (
        <div className="w-full">
          <label htmlFor="stacks">기술스택</label>
          <SelectCheckBox
              name="stacks"
              placeholder="사용가능한 기술스택을 선택해주세요."
              checkBoxList={STACK_LIST}
              // control 타입 캐스팅
              control={control as unknown as Control<FieldValues>}
              maximum={8}
          />
        </div>
    );
  }

  return (
      <div className="w-full mb-4">
        <InputField
            key={field.name}
            label={field.label}
            name={field.name as Path<T>}
            control={control}
            rules={field.rules as object}
        />
      </div>
  );
};

export default FormFieldRenderer;