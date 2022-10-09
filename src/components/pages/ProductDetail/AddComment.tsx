import { Button, Comment, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useApiProgress } from "../../../hooks/useApiProgress";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useUser } from "../../../hooks/useUser";
import ProductComment from "../../../models/catalog/productComment/ProductComment";
import BaseService from "../../../service/BaseService";
import { getProductCommentList } from "../../../store/actions/catalogActions";
import AvatarWithDefault from "../../common/AvatarWithDefault";

const { TextArea } = Input;

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          {t("AddComment")}
        </Button>
      </Form.Item>
    </>
  );
};

const AddComment: React.FC = () => {
  const user = useUser();
  const [value, setValue] = useState<string>("");
  const { t } = useTranslation();
  const params = useParams();
  const loading = useApiProgress(
    "post",
    "/api/Catalog/UpdateProductComment",
    ""
  );
  const dispatch = useTypedDispatch();

  const handleSubmit = async () => {
    try {
      const service = new BaseService();
      if (!service.Authentication.isAuthenticate()) {
        notification.error({
          message: t("Error"),
          description: t("YouMustLoginToMakeComment"),
        });
      } else {
        const comment = new ProductComment();
        comment.text = value;
        comment.productID = Number(params.id);
        const { data } = await service.Catalog.updateProductComment(comment);
        if (!data.hasFailed && data.data) {
          notification.success({
            message: t("Success"),
            description: t("CommentAddedSuccessfully"),
          });
          dispatch(getProductCommentList());
          setValue("")
        }
      }
    } catch (error) {}
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Comment
        avatar={<AvatarWithDefault imagePath={user.imagePath} />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={loading}
            value={value}
          />
        }
      />
    </>
  );
};

export default AddComment;
