import React from 'react'

function Payment(props) {
    return (
        <div>
            <label>Amount to Pay is {props.paymentData.amountBal}</label>
        </div>
    )
}

export default Payment
