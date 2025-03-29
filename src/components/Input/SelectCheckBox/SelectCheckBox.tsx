"use client";

import { useState } from "react";

import { Control, FieldValues, useController } from "react-hook-form";

import SelectBoxField from "@/types/selectBoxField";

import SelectCheckBoxModal from "./SelectCheckBoxModal";

interface SelectCheckBoxProps<TFieldValues extends FieldValues> {
  // name은 Form Values name과 일치해야 함
  name: keyof TFieldValues;

  // useForm의 control 객체
  control: Control<TFieldValues>;

  // DropDown 메뉴의 객체 타입 value & label 의 형식이어야함
  checkBoxList: SelectBoxField[];
  placeholder: string;
  maximum?: number;
  title?: string;
}

const SelectCheckBox = ({
  name,
  control,
  checkBoxList,
  placeholder,
  maximum,
  title,
}: SelectCheckBoxProps<FieldValues>) => {
  const {
    field: { value: feildValue, onChange },
  } = useController({
    name,
    control,
  });

  const selectedList = checkBoxList.filter((item) =>
    feildValue.includes(item.value)
  );

  // 드롭다운 옵션 on / off
  const [selectModal, setSelectModal] = useState<boolean>(false);

  // 체크박스를 눌렀을 때 실행되는 함수
  const selectCheckBox = (item: SelectBoxField, isChecked: boolean) => {
    // updatedValues => 체크한 Value의 배열
    const updatedValues = isChecked
      ? [...feildValue, item.value]
      : feildValue.filter(
          (existingValue: string) => existingValue !== item.value
        );

    // 선택할 수 있는 최댓값이 존재한다면 최대값보다 더 많이 선택하지 못하게
    if (maximum && updatedValues.length > maximum) return;

    // 폼 데이터로 배열 전달
    onChange(updatedValues);
  };

  return (
    <>
      {selectModal && (
        <SelectCheckBoxModal
          onSelect={selectCheckBox}
          onClose={() => {
            setSelectModal(false);
          }}
          onReset={() => {
            onChange([]);
          }}
          title={title}
          checkBoxList={checkBoxList}
          selectValues={selectedList}
          feildValue={feildValue}
        />
      )}

      <div
        onClick={() => setSelectModal(true)}
        className="text-black text-opacity-50 border border-gray-300 rounded-md bg-white text-center py-2"
      >
        {selectedList.length === 0 ? (
          `${placeholder}`
        ) : (
          <ul className="grid grid-cols-3 gap-2 px-2 ">
            {selectedList.map((item) => (
              <li
                className=" rounded-md border border-gray-300 px-4 py-1 text-black text-center gap-2"
                key={item.value}
              >
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SelectCheckBox;
