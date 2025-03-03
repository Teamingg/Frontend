import UserInfoForm from "@/components/user/UserInfoForm/UserInfoForm";
import { UserInfoFormValues } from "@/types/UserInfoFormValues";

interface EditUserFormProps {
  userInfo: UserInfoFormValues;
  onSubmit: (data: UserInfoFormValues) => Promise<void>;
}

const EditUserForm = ({ userInfo, onSubmit }: EditUserFormProps) => {
  return (
    <UserInfoForm
      isEdit={true}
      defaultValues={userInfo}
      formActionHandler={onSubmit}
    />
  );
};

export default EditUserForm;