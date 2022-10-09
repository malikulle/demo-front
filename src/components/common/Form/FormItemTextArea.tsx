import { Rule } from "antd/lib/form";
import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

type FormItemTextAreaProp = {
  name: string;
  label: string;
  rules: Rule[];
  placeholder: string;
  onChange?: any;
};

const FormItemTextArea: React.FC<FormItemTextAreaProp> = (
  props: FormItemTextAreaProp
) => {
  return (
    <Form.Item label={props.label} name={props.name} rules={props.rules}>
      <TextArea
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
      />
    </Form.Item>
  );
};

export default FormItemTextArea;
