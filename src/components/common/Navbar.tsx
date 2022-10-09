import React from "react";
import { useTranslation } from "react-i18next";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import BaseService from "../../service/BaseService";
import { logoutUser } from "../../store/actions/membershipActions";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

const Navbar: React.FC = () => {
  const service = new BaseService();

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item>
          <Link to="/">{t("Home")}</Link>
        </Menu.Item>
        {!service.Authentication.isAuthenticate() ? (
          <Menu.Item>
            <Link to="/login">{t("Login")}</Link>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item>
              <Link to="/dashboard/statistics">{t("Admin")}</Link>
            </Menu.Item>
            <Menu.Item>
              <span onClick={onLogoutClick}>{t("Logout")}</span>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
