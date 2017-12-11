import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import _ from "lodash";
import { TabList, Tab } from "./Tabs";
import Checkout from "./Checkout";
import { withStripe } from "./StripeApi";

const key = "pk_test_riDOpmGdmUZOcENlKLPSTmz8";
const secretKey = "sk_test_MeDflgoI8h0TMUfHNUu21CJN";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const CheckoutComponent = withStripe(Checkout, key, secretKey);
    return (
      <div className="app">
        <TabList>
          <Tab name="Checkout" default>
            <CheckoutComponent />
          </Tab>
          <Tab name="Payments">
            <div>
              <h2>Hello B</h2>
            </div>
          </Tab>
          <Tab name="Disputes">
            <div>
              <h2>Hello C</h2>
            </div>
          </Tab>
        </TabList>
      </div>
    );
  }
}

export default App;
