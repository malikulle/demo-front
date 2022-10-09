import React from "react";
import { Button, Col, Layout, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { changeSystemLanguage } from "../../store/actions/internationalizationActions";
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
const { Footer } = Layout;

const CustomFooter: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { i18n } = useTranslation();

  const onChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    dispatch(changeSystemLanguage(language));
  };

  return (
    <Footer style={{ textAlign: "center", background: "#001529" }}>
      <Row>
        <Col>
          <Button type="primary" onClick={() => onChangeLanguage("en")}>
            EN
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => onChangeLanguage("tr")}>
            TR
          </Button>
        </Col>
      </Row>
      <>
        <Tag icon={<TwitterOutlined />} color="#55acee">
          Twitter
        </Tag>
        <Tag icon={<YoutubeOutlined />} color="#cd201f">
          Youtube
        </Tag>
        <Tag icon={<FacebookOutlined />} color="#3b5999">
          Facebook
        </Tag>
        <Tag icon={<LinkedinOutlined />} color="#55acee">
          LinkedIn
        </Tag>
      </>
    </Footer>
  );
};

export default CustomFooter;
