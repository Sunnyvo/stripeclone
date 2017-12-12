import React, { Component } from 'react'
import {Table, } from "bloomer"
export default class ChargeItem extends Component {
	constructor(props){
		super(props);
		this.state={

		}
	}
	render() {
		console.log("Sunny3")
		console.log(this.props)
		const charge = this.props.charge
		return (
			<tr>
				<td>{charge.id}</td>
				<td>{charge.amount}</td>
				<td> {charge.amount_refunded}</td>
			</tr>
		)
	}
}
