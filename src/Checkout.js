import React, { Component } from "react";
import "./Checkout.css";
import _ from "lodash";
import "bulma/css/bulma.css";
import {Title, Field, Label, Control, Input, Icon, Help, Button, Select, Card, TextArea} from "bloomer";
import "./font-awesome/css/font-awesome.css";
import { error } from "util";

const CARDS = {
  1: "VISA",
  2: "MASTERCARD"
};

const CURRENCIES = {
  usd: "USD",
  vnd: "VND",
  eur: "EUR",
  gbp: "GBP"
};

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardType: 1,
      cardNumber: "",
      exp_month: "",
      exp_year: "",
      amount: "",
      currency: "usd",
      description: "",
      month: "",
      year: "",
      onCreate: true,
      err: "",
      infoSuccess: ""
    };
  }

  createCharge = () => {
    this.setState({
      latestCharge: "Creating token...",
      err: ""
    }, () => {
      this.props
        .postPublic("tokens", {
          "card[number]": this.state.cardNumber,
          "card[exp_month]": this.state.month,
          "card[exp_year]": this.state.year
        })
        .then(token => {

          if (token.error !== undefined && token.error.message !==undefined)
          {
            console.log(token.error.message)
            this.setState(
              {
                err: token.error.message
              }
            )
          }
          else{
            this.setState({ latestCharge: "Creating charge..." }, () => {
              this.props
                .postSecret("charges", {
                  amount: this.state.amount,
                  currency: this.state.currency,
                  description: this.state.description,
                  source: token.id
                })
                .then(charge => {
                  this.setState({
                    latestCharge: charge.id,
                    status: false
                  });
                  if (charge.error !== undefined && charge.error.message !==undefined)
                  {
                    console.log(charge.error.message)
                    this.setState(
                      {
                        err: charge.error.message
                      }
                    )
                  }
                });
            });
          }
        });
    });
  };

  render() {
    console.log("sunny1:");
		console.log(this.props);
    const showCardNumberWarning = this.state.cardNumber.trim().length == 0;
    return (
      <Card className="card">
        <Field>
          <Label>Card Number</Label>
          <div className="card_number_row">
            <Control>
              <Input
                className="input"
                value={this.state.cardNumber}
                onChange={e => this.setState({ cardNumber: e.target.value })}
              />
            </Control>
            <Select
              className="select"
              onChange={e => this.setState({ cardType: e.target.value })}
            >
              {this.renderCardOptions()}
            </Select>
            <Control>
              <Input className="inputCard" placeholder={'VCV'} />
              <Input className="inputMonth"
                onChange={ e => this.setState({month: e.target.value})}
              />
              <b> / </b>
              <Input className="inputYear"
                onChange={e => this.setState({year: e.target.value})}
              />
            </Control>
          </div>
          {showCardNumberWarning ? (
            <Help isColor="danger">Please enter card number</Help>
          ) : null}
        </Field>
        <Field>
          <Label>Amount</Label>
          <div className="amount_row">
            <Control>
              <Input
                className="input"
                value={this.state.amount}
                onChange={e => this.setState({ amount: e.target.value })}
              />
            </Control>
            <Select
              className="select"
              onChange={e => this.setState({ currency: e.target.value })}
            >
              {this.renderCurrencyOptions()}
            </Select>
          </div>
        </Field>
        <Field>
          <Label>Description</Label>
          <Control>
            <TextArea className="description"
              onChange={ e => this.setState({description: e.target.value})}
              placeholder={'The purpose of using this money'} />
          </Control>
        </Field>
        <Button isColor="info" onClick={this.createCharge}>
          CHARGE
        </Button>
        <Help isColor="info">
          {this.state.latestCharge}
        </Help>
        <Help isColor="danger">
          {this.state.err}
        </Help>
        <Help isColor="success">
          {this.state.infoSuccess}
        </Help>
      </Card>
    );
  }

  renderCardOptions = () => {
    const options = _.toPairs(CARDS).map(p => {
      return <option value={p[0]}>{p[1]}</option>;
    });
    return options;
  };

  renderCurrencyOptions = () => {
    const options = _.toPairs(CURRENCIES).map(p => {
      return <option value={p[0]}>{p[1]}</option>;
    });
    return options;
  };
}

