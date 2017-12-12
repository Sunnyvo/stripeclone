import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import _ from "lodash";
import { TabList, Tab } from "./Tabs";
import Checkout from "./Checkout";
import { withStripe } from "./StripeApi";
import { publicKey, secretKey} from "./env.json";
import Charges from "./Charges";

const pubKey = publicKey;
const secKey = secretKey;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Create = "POST";
    const List = "GET"
    const CheckoutComponent = withStripe(Create, Checkout, pubKey, secKey);
    const ListChargesComponent = withStripe(List, Charges, pubKey, secKey);
    return (
      <div className="app">
        <TabList>
          <Tab name="Checkout" default>
            <CheckoutComponent />
          </Tab>
          <Tab name="Charges">
            <ListChargesComponent />
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



