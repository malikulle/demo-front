import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  BookOutlined,
  ExceptionOutlined,
  DashboardFilled
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BaseService from "../../service/BaseService";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type SidebarProp = {
  schema: string;
  table: string;
};

const Sidebar: React.FC<SidebarProp> = (props: SidebarProp) => {
  const { t } = useTranslation();
  const service = new BaseService();

  const getAddressBook = () => {
    const list = ["CountryList"];
    const menuItems = checkList(list);
    if (menuItems.length > 0) {
      return getItem(t("AddressBook"), "AddressBook", <BookOutlined />, [
        ...menuItems,
      ]) as MenuItem;
    } else {
      return {} as MenuItem;
    }
  };

  const getDashboard = () => {
    const list = ["Statistics"];
    const menuItems = checkList(list);
    if (menuItems.length > 0) {
      return getItem(t("Dashboard"), "Dashboard", <DashboardFilled />, [
        ...menuItems,
      ]) as MenuItem;
    } else {
      return {} as MenuItem;
    }
  }

  const getMembership = () => {
    const list = ["UserList", "PermissionList", "RoleList"];
    const menuItems = checkList(list);
    if (menuItems.length > 0) {
      return getItem(t("Membership"), "Membership", <UserOutlined />, [
        ...menuItems,
      ]) as MenuItem;
    } else {
      return {} as MenuItem;
    }
  };

  const getCatalog = () => {
    const list = ["CategoryList","ProductList"];
    const menuItems = checkList(list);
    if (menuItems.length > 0) {
      return getItem(t("Catalog"), "Catalog", <AppstoreOutlined />, [
        ...menuItems,
      ]) as MenuItem;
    } else {
      return {} as MenuItem;
    }
  };

  const getConfiguration = () => {
    const list = ["LanguageList", "ParameterList","JobList","JobExecutionList"];
    const menuItems = checkList(list);
    if (menuItems.length > 0) {
      return getItem(t("Configuration"), "Configuration", <SettingOutlined />, [
        ...menuItems,
      ]) as MenuItem;
    } else {
      return null as MenuItem;
    }
  };

  const getLogging = () => {
    const list = ["ExceptionLogList", "AuditLogList"];
    const menuItems = checkList(list);
    if (menuItems.length > 0) {
      return getItem(t("Logging"), "Logging", <ExceptionOutlined />, [
        ...menuItems,
      ]) as MenuItem;
    } else {
      return null as MenuItem;
    }
  };


  const checkList = (items: string[]) => {
    const list = [] as MenuItem[];
    items.forEach((menuItem) => {
      if (service.Authentication.canAccess(menuItem)) {
        list.push(getItem(menuItem, menuItem));
      }
    });
    return list;
  };

  const getMenu = () => {
    const dashboard = getDashboard()
    const membership = getMembership();
    const catalog = getCatalog();
    const configuration = getConfiguration();
    const addressBook = getAddressBook();
    const logging = getLogging()

    const list = [];
    if (dashboard && dashboard.key) {
      list.push(dashboard);
    }
    if (membership && membership.key) {
      list.push(membership);
    }
    if (catalog && catalog.key) {
      list.push(catalog);
    }
    if (configuration && configuration.key) {
      list.push(configuration);
    }
    if (addressBook && addressBook.key) {
      list.push(addressBook);
    }
    if (logging && logging.key) {
      list.push(logging);
    }
    return list;
  };

  const items: MenuItem[] = getMenu();

  const [current, setCurrent] = useState(props.table);
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    const first = e.keyPath[1];
    const second = e.keyPath[0];
    const path = `/${first}/${second}`;
    navigate(path);
  };

  return (
    <Menu
      theme="light"
      onClick={onClick}
      style={{ width: 256 }}
      defaultOpenKeys={[props.schema]}
      selectedKeys={[current]}
      mode="inline"
      items={items}
    />
  );
};

export default Sidebar;
