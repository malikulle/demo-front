import { Avatar } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

type AvatarWithDefaultProps = {
  imagePath?: string;
};

const AvatarWithDefault: React.FC<AvatarWithDefaultProps> = (
  props: AvatarWithDefaultProps
) => {
  if (props.imagePath) {
    return <Avatar src={props.imagePath} />;
  } else {
    return <Avatar icon={<UserOutlined />} />;
  }
};

export default AvatarWithDefault;
