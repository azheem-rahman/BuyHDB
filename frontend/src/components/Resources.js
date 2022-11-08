import React from "react";

const Resources = () => {
  return (
    <div>
      <br />
      <div className="resources-header">
        <h1 className="centered">Resources</h1>
      </div>
      <div className="container">
        <div className="row">
          <h4 className="centered">
            Some quick links to assist you in your flat purchase or sale
          </h4>
        </div>
        <div className="row">
          <div className="col">
            <a href="https://services2.hdb.gov.sg/webapp/BB31AWDashboardWeb/BB31PLogin.jsp">
              HDB Resale Portal
            </a>
            <p>
              HDB Portal guides you through the steps to purchase and sell a
              resale HDB flat
            </p>
          </div>
          <div className="col">
            <a href="https://homes.hdb.gov.sg/home/calculator">
              HDB Finance Calculator
            </a>
            <p>
              HDB Finance Calculator aids you in your next purchase or sale of
              HDB flat. You can use the calculator to check your budget, your
              payment plan, or sale proceeds
            </p>
          </div>
          <div className="col">
            <a href="https://www.hdb.gov.sg/cs/infoweb/residential/buying-a-flat/financing-a-flat-purchase/financial-planning-for-flat-purchase">
              HDB Financial Planning Guides
            </a>
            <p>
              Articles provided by HDB to help you in financial planning for
              your next purchase or sale of HDB flat
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a href="https://www.carousell.sg/property-for-sale/hdb/?searchId=Nms_p6">
              Carousell
            </a>
            <p>See the latest HDB for sale listing on Carousell</p>
          </div>
          <div className="col">
            <a href="https://www.propertyguru.com.sg/singapore-property-listing/hdb">
              PropertyGuru
            </a>
            <p>See the latest HDB for sale listing on PropertyGuru</p>
          </div>
          <div className="col">
            <a href="https://www.99.co/singapore/sale/hdb">99.co</a>
            <p>See the latest HDB for sale listing on 99.co</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
