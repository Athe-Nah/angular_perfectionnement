export class ComplexFormValue {
  personalInfo!: {
    firstName: string,
    lastName: string
  };
  contactPreference!: string;
  email?: { // facultatif
    email: string,
    confirm: string
  };
  phone?: string; // facultatif
  loginInfo!: {
    username: string,
    password: string,
    confirmPassword: string,
  };
}
