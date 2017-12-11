import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import _ from "lodash";
import { TabList, Tab } from "./Tabs";
import Checkout from "./Checkout";
import { withStripe } from "./StripeApi";
import { publicKey, secretKey} from "./env.json"
const pubKey = publicKey;
const secKey = secretKey;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const CheckoutComponent = withStripe(Checkout, pubKey, secKey);
    return (
      <div className="app">
        <TabList>
          <Tab name="Checkout" default>
            <CheckoutComponent />
          </Tab>
          <Tab name="Charges">
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
