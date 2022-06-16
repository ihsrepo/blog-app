export interface BaseFormProps {
  title: string;
  description: string;
  body: string;
}

export interface FormProps extends BaseFormProps {
  id: string;
}
