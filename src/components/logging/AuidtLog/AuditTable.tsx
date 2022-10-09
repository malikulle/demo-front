import { TablePaginationConfig, Modal } from "antd";
import React, { useEffect, useState } from "react";
import BaseService from "../../../service/BaseService";
import { useApiProgress } from "../../../hooks/useApiProgress";
import DynamicTable from "../../common/DynamicTable";
import Dynamic from "../../../service/base/Dynamic";
import AuditLog from "../../../models/logging/auditLog/AuditLog";
import AuditLogDetail from "./AuditLogDetail";
import { useTranslation } from "react-i18next";

const service = new BaseService();

const AuditTable: React.FC = () => {
  const isLoading = useApiProgress("post", "/api/Logging/GetExceptionLogs", "");

  const {t} = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [dynamic, setDynamic] = useState<Dynamic>(new Dynamic());
  const [auditLogId, setAuditLogId] = useState<number>(0);

  const handleTableChange = (data: Dynamic) => {
    setDynamic(data);
  };

  const onRowClick = (data: AuditLog) => {
    setIsModalOpen(true);
    setAuditLogId(data.id);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const filter = new AuditLog();
        const { data } = await service.Logging.getAuditLogs(filter, dynamic);
        if (!data.hasFailed && data.data) {
          setItems(data.data.items);
          setPagination({
            current: data.data.index,
            total: data.data.count,
            pageSize: data.data.size,
          });
        }
      } catch (error) {}
    };
    getItems();
  }, [dynamic]);

  return (
    <>
      <Modal
        title={t("AuditLogDetail")}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
      >
        <AuditLogDetail id={auditLogId} />
      </Modal>
      <DynamicTable
        columns={[
          "id",
          "type",
          "primaryKey",
          "userID",
          "tableName",
          "oldValues",
          "newValues",
          "affectedColumns",
        ]}
        filterColumns={[
          "id",
          "type",
          "primaryKey",
          "userID",
          "tableName",
          "oldValues",
          "newValues",
          "affectedColumns",
        ]}
        sorterColumns={[]}
        items={items}
        loading={isLoading}
        onTableUpdate={handleTableChange}
        pagination={pagination}
        rowKey="id"
        onRowClick={onRowClick}
      />
    </>
  );
};

export default AuditTable;
