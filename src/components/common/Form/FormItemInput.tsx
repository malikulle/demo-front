import React from "react";
import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";

type FormItemInputProp = {
  name: string;
  label: string;
  rules: Rule[];
  placeholder: string;
  type?: string;
  onChange?: any;
};

//rules={[{ required: true, message: "Please input a category name" }]}

const FormItemInput: React.FC<FormItemInputProp> = (
  props: FormItemInputProp
) => {
  return (
    <Form.Item label={props.label} name={props.name} rules={props.rules}>
      <Input
        onChange={props.onChange}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
      />
    </Form.Item>
  );
};

export default FormItemInput;
