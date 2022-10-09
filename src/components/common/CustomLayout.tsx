import React from "react";
import { BrowserRouter } from "react-router-dom";
import SiteLayout from "./SiteLayout";

const CustomLayout: React.FC = () => {

  return (
    <BrowserRouter>
      <SiteLayout />
    </BrowserRouter>
  );
};

export default CustomLayout;
