import React, { Component } from "react";
import "./Charges.css";
import _ from "lodash";
import "bulma/css/bulma.css";
import {Title, Field, Card, Table} from "bloomer";
import "./font-awesome/css/font-awesome.css";
import { error } from "util";
import ChargeItem from "./ChargeItem";

export default class Charges extends Component {
	constructor(props){
		super(props);
		this.state= {
			listCharges: []
		}
	}

	componentWillMount = () => this.props.postSecret("charges",
	{
		limit: 3 ,
	})
	.then(charges => {
		this.setState({
			listCharges: charges.data
		})
	}
)



	render() {
		console.log(this.state.listCharges);
		const chargeItems = this.state.listCharges.map(charge =>{
			return <ChargeItem charge = {charge}/>
		})
		console.log("hello:")
		console.log(chargeItems);
		return (
			<Card>
				<Title> The History of charges </Title>
				<Field>
					<Table isBordered isStriped isNarrow>
						<thead>
							<tr>
								<th>Token</th>
								<th>Amount</th>
								<th>Amount refund</th>
							</tr>
						</thead>
						<tbody>
							{chargeItems}
						</tbody>
					</Table>
				</Field>
			</Card>
		)
	}
}