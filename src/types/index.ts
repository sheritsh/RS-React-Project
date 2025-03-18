export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  country: string;
  picture: string | null;
}

export interface FormState {
  uncontrolledForm: FormData | null;
  hookForm: FormData | null;
  lastAddedType: 'uncontrolled' | 'hook' | null;
  timestamp: number | null;
}
