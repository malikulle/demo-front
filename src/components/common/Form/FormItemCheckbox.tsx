import React from "react";
import { Form, Switch } from "antd";

type FormItemCheckboxProp = {
  show: boolean;
  label: string;
  name: string;
  onChange?: any;
  checked: boolean;
};

const FormItemCheckbox: React.FC<FormItemCheckboxProp> = (
  props: FormItemCheckboxProp
) => {
  if (props.show) {
    return (
      <Form.Item label={props.label} name={props.name}>
        <Switch checked={props.checked} onChange={props.onChange} />
      </Form.Item>
    );
  }
  return <></>;
};

export default FormItemCheckbox;
