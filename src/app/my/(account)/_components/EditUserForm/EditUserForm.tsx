import UserInfoForm from "@/components/user/UserInfoForm/UserInfoForm";
import { UserInfoFormValues } from "@/components/user/UserInfoForm/UserInfoFormValues";

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
