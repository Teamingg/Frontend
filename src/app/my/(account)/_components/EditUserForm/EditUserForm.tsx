import UserInfoForm, {
  UserInfoFormValues,
} from "@/components/user/UserInfoForm/UserInfoForm";

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
