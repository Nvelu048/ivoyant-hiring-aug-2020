import React from 'react'
import './Table.css'
import { Button } from 'antd'
export default function Table(props) {

    const data = props.tableData.map((tableDatum, index) =>
        <tr key={index}>
            <td>
                {tableDatum['invoiceId']}
            </td>
            <td>
                {tableDatum['vendorId']}
            </td>
            <td>
                {tableDatum['product']}
            </td>
            <td>
                {tableDatum['quantity']}
            </td>
            <td>
                {tableDatum['invoiceDate']}
            </td>
            <td>
                {tableDatum['invoiceDate']}
            </td>
            <td>
                {tableDatum['amountBal']}
            </td>
            <td>
                {tableDatum['amountDue']}
            </td>
            <td>
                {tableDatum['creditBal']}
            </td>
            <td>
                <Button type="primary" disabled={Number(tableDatum['amountDue']) <= 0} onClick={() => props.onPayment(tableDatum)}>Payment</Button>
            </td>
        </tr>
    )
    const tableHeader = (
        <tr>
            <th>
                Invoice Id
            </th>
            <th>
                Vendor Id
            </th>
            <th>
                Product
            </th>
            <th>
                Quantity
            </th>
            <th>
                Invoice Data
            </th>
            <th>
                Invoice Date
            </th>
            <th>
                Amount Balance
            </th>
            <th>
                Amount Due
            </th>
            <th>
                Credit Bal
            </th>
            <th>
                Payment
            </th>
        </tr>
    );
    return (
        <table>
            <thead>
                {
                    tableHeader
                }
            </thead>
            <tbody>
                {
                    data
                }
            </tbody>
        </table>
    )
}
