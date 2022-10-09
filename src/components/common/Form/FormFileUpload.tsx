import { Rule } from "antd/lib/form";
import React, { useState } from "react";
import FormItemInput from "./FormItemInput";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

type FormItemUpladProp = {
  name: string;
  label: string;
  rules: Rule[];
  placeholder: string;
  type?: string;
  onChange?: any;
  imagePath: string;
  onRemoveClick?: any;
};

const FormFileUpload: React.FC<FormItemUpladProp> = (
  props: FormItemUpladProp
) => {
  const {t} = useTranslation()
  const [visible, setVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const handleOk = () => {
    setConfirmLoading(true);
    props.onRemoveClick()
    setOpen(false);
    setConfirmLoading(false);
  };

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <FormItemInput
        onChange={props.onChange}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        label={props.label}
        rules={props.rules}
      />
      {props.imagePath && (
        <>
          <Button type="primary" onClick={() => setVisible(true)}>
            <UploadOutlined />
          </Button>
          <Popconfirm
            title={t("AreYouSureToDelete")}
            open={open}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
          >
            <Button danger type="primary" onClick={showPopconfirm}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>

          <Image
            width={200}
            style={{ display: "none" }}
            src={props.imagePath}
            preview={{
              visible,
              src: props.imagePath,
              onVisibleChange: (value) => {
                setVisible(value);
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default FormFileUpload;
