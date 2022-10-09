import React from "react";
import { Button, Form } from "antd";
import { ButtonType } from "antd/lib/button";
import { ButtonHTMLType } from "antd/lib/button/button";
type FormItemButtonProp = {
  style: React.CSSProperties;
  type: ButtonType;
  htmlType: ButtonHTMLType;
  buttonText: string;
  loading?: boolean;
};

const FormItemButton: React.FC<FormItemButtonProp> = (
  props: FormItemButtonProp
) => {
  return (
    <Form.Item style={props.style}>
      <Button
        type={props.type}
        htmlType={props.htmlType}
        loading={props.loading}
      >
        {props.buttonText}
      </Button>
    </Form.Item>
  );
};

export default FormItemButton;
