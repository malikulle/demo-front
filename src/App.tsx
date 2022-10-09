import { BackTop } from "antd";
import "antd/dist/antd.css";

import React, { useEffect } from "react";
import "./App.css";
import CustomLayout from "./components/common/CustomLayout";
import { useTypedDispatch } from "./hooks/useTypedDispatch";
import BaseService from "./service/BaseService";
import { logoutUser, refreshToken } from "./store/actions/membershipActions";
import { ArrowUpOutlined } from "@ant-design/icons";

const style: React.CSSProperties = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};

const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const getRefreshToken = async () => {
      const service = new BaseService();
      if (service.Authentication.isAuthenticate()) {
        try {
          const { data } = await service.Authentication.getRefreshToken();
          if (!data.hasFailed && data.data && data.data.user) {
            dispatch(refreshToken(data.data.user));
          }
        } catch (error) {
          dispatch(logoutUser());
        }
      }
    };
    getRefreshToken();
  }, [dispatch]);

  return (
    <>
      <CustomLayout />
      <BackTop>
        <div style={style}>
          <ArrowUpOutlined />
        </div>
      </BackTop>
    </>
  );
};

export default App;
