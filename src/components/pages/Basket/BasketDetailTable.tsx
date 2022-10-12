import React from "react";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import type { ColumnsType } from "antd/es/table";
import { Image, Popconfirm, Space, Table, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import BasketItem from "../../../models/sales/basketItem/BasketItem";
import BaseService from "../../../service/BaseService";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { updateBasket } from "../../../store/actions/salesActions";
import { useTranslation } from "react-i18next";
import { useApiProgress } from "../../../hooks/useApiProgress";
const BasketDetailTable: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const { currentUserBasket } = useTypedSelector((x) => x.currentUserBasket);
  const loading = useApiProgress("POST", "/api/Sales/RemoveFromBasket", "");

  const columns: ColumnsType<BasketItem> = [
    {
      title: "ImagePath",
      key: "action",
      render: (_: any, record: any) =>
        record.imagePath ? (
          <Image width={150} src={record.imagePath} preview={false} />
        ) : (
          ""
        ),
    },
    {
      title: "ProductName",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) => (
        <Space size="middle">
          <InputNumber
            min={1}
            value={record.quantity}
            onChange={(value: number) =>
              updateBasketQuantity(value, record.productID)
            }
          />
        </Space>
      ),    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "TotalPrice",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            placement="topLeft"
            title={t("AreYouSureToRemoveFromBasket")}
            onConfirm={() => removeFromBasket(record.productID)}
            okText={t("Yes")}
            cancelText={t("No")}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const removeFromBasket = async (productID: number) => {
    try {
      const service = new BaseService();
      const { data } = await service.Sales.removeFromBasket(
        productID,
        currentUserBasket.id
      );
      if (!data.hasFailed && data.data) {
        dispatch(updateBasket(data.data));
      }
    } catch (error) {}
  };

  const updateBasketQuantity = async (quantity: number, productID: number) => {
    try {
      const service = new BaseService();
      const { data } = await service.Sales.updateBasketQuantity(
        quantity,
        productID,
        currentUserBasket.id
      );
      if (!data.hasFailed && data.data) {
        dispatch(updateBasket(data.data));
      }
    } catch (error) {}
  };

  return (
    <Table
      dataSource={currentUserBasket.basketItems}
      columns={columns}
      loading={loading}
    />
  );
};

export default BasketDetailTable;
