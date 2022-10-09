import { Alert } from "antd";
import React from "react";
import { ServiceResultMessage } from "../../service/base/serviceObjectResult";

type ServiceMessageProp = {
  Message: ServiceResultMessage;
};

const ServiceMessage = (prop: ServiceMessageProp) => {
  if (prop && prop.Message) {
    if (prop.Message.isError) {
      return (
        <Alert
          style={{ marginBottom: "10px" }}
          message={prop.Message.code}
          description={prop.Message.description}
          type="error"
        />
      );
    } else if (prop.Message.isSuccess) {
      return (
        <Alert
          style={{ marginBottom: "10px" }}
          message={prop.Message.code}
          description={prop.Message.description}
          type="success"
        />
      );
    } else if (prop.Message.isWarning) {
      return (
        <Alert
          style={{ marginBottom: "10px" }}
          message={prop.Message.code}
          description={prop.Message.description}
          type="warning"
        />
      );
    }
  }
  return <div></div>;
};

export default ServiceMessage;
