import React, { useEffect, useState } from "react";
import { Timeline } from "antd";
import AuditLog from "../../../models/logging/auditLog/AuditLog";
import BaseService from "../../../service/BaseService";

type AuditLogDetailProps = {
  id: number;
};

const AuditLogDetail: React.FC<AuditLogDetailProps> = (
  props: AuditLogDetailProps
) => {
  const [auditLog, setAuditLog] = useState<AuditLog>(new AuditLog());

  useEffect(() => {
    const getAuditLog = async () => {
      try {
        const service = new BaseService();
        const { data } = await service.Logging.getAuditLog(props.id);
        if (!data.hasFailed && data.data) {
          setAuditLog(data.data);
        }
      } catch (error) {}
    };
    getAuditLog();
  }, [props.id]);

  return (
    <Timeline>
      {auditLog && (
        <>
          <Timeline.Item>Type : {auditLog.type}</Timeline.Item>
          <Timeline.Item>Primary Key : {auditLog.primaryKey}</Timeline.Item>
          <Timeline.Item>User ID : {auditLog.userID}</Timeline.Item>
          <Timeline.Item>Table Name : {auditLog.tableName}</Timeline.Item>
          <Timeline.Item>Old Values : {auditLog.oldValues}</Timeline.Item>
          <Timeline.Item>New Values : {auditLog.newValues}</Timeline.Item>
          <Timeline.Item>AffectedColumns : {auditLog.affectedColumns}</Timeline.Item>
        </>
      )}
    </Timeline>
  );
};

export default AuditLogDetail;
