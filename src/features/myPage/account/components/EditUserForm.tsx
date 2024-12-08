import UserInfoForm, {
  UserInfoFormValues,
} from "@/entities/user/components/UserInfoForm";

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
