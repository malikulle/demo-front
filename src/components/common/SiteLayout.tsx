import { Layout } from "antd";
import React from "react";
// import { useTypedSelector } from "../../hooks/useTypeSelector";
import Routers from "../../routers/Routers";
import CustomBreadcrumb from "./CustomBreadcrumb";
import CustomFooter from "./CustomFooter";
import Navbar from "./Navbar";

const { Content } = Layout;


const SiteLayout: React.FC = () => {
//   const { layout } = useTypedSelector((state) => state.layout);

  return (
    <Layout>
      <Navbar />
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <CustomBreadcrumb />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routers />
          </Content>
        </Layout>
      </Layout>
      <CustomFooter />
    </Layout>    
  );
};

export default SiteLayout;
