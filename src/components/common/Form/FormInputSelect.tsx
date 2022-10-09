import React from "react";
import { Form, Select } from "antd";
import { Rule } from "antd/lib/form";
import SelectInputModel from "../../../models/action/SelectInputModel";

type FormInputSelectProp = {
  name: string;
  label: string;
  rules: Rule[];
  placeholder: string;
  mode?: "multiple" | "tags";
  items: SelectInputModel[];
  onChange?: any;
  defaultValue? : any
};

const FormInputSelect: React.FC<FormInputSelectProp> = (
  props: FormInputSelectProp
) => {
  return (
    <Form.Item name={props.name} label={props.label} rules={props.rules}>
      <Select
        mode={props.mode}
        placeholder={props.placeholder}
        allowClear
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      >
        {props.items &&
          props.items.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default FormInputSelect;
