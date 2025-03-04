import SelectBoxField from "@/types/selectBoxField";

import Modal from "../../Modal/Modal";
import CloseButton from "../../Button/CloseButton";
import CheckBox from "./CheckBox";

interface SelectCheckBoxModalProps {
  // 모달을 닫는 함수
  onClose: () => void;
  // 체크박스 리스트의 배열
  checkBoxList: SelectBoxField[];
  // 폼에 전송할 선택된 Value의 배열 => [value, value, ...]
  feildValue: string[];
  // 화면에 보여질 선택된 Value의 배열 => [{value : string; label : string}, ...]
  selectValues: SelectBoxField[];
  // feildValue를 초기화 할 함수
  onReset: () => void;
  // CheckBox를 눌렀을 때 트리거 될 함수
  onSelect: (item: SelectBoxField, isChecked: boolean) => void;
  // 모달의 제목
  title: string;
}

const SelectCheckBoxModal = ({
  onClose,
  checkBoxList,
  feildValue,
  selectValues,
  onReset,
  onSelect,
  title,
}: SelectCheckBoxModalProps) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="max-w-[500px] bg-white">
        <div className="flex justify-between mb-4">
          <h4 className="text-lg md:text-2xl">{title}</h4>
          <CloseButton onClick={onClose} size={4} />
        </div>
        <ul className="grid grid-cols-4 text-sm md:text-basetext-center md:flex md:flex-wrap gap-3  border-b pb-4 mb-4">
          {checkBoxList.map((item) => (
            <li
              className="border rounded-md flex justify-between  hover:bg-gray-100 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary  has-[:checked]:text-white"
              key={item.value}
            >
              <CheckBox
                value={item.value}
                checked={
                  feildValue ? feildValue.includes(item.value) : undefined
                }
                onChange={(e) => {
                  onSelect(item, e.target.checked);
                }}
                label={item.label}
                id={item.value}
              />
            </li>
          ))}
        </ul>

        {selectValues.length > 0 && (
          <ul className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
            {selectValues.map((item) => (
              <li
                className="rounded-md border text-black text-sm md:text-base px-2 py-2 flex items-center justify-center gap-2"
                key={item.value}
              >
                <span>{item.label}</span>
                <CloseButton onClick={() => onSelect(item, false)} size={3} />
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-2 ">
          <button
            onClick={onReset}
            className="w-1/4 py-2 md:py-3 border rounded-xl hover:bg-gray-100 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 md:py-3 bg-primary text-white rounded-xl  hover:bg-black/90 transition-colors"
          >
            선택완료
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectCheckBoxModal;