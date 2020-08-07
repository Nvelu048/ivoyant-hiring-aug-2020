import React, { useState } from 'react'
import { Checkbox, Modal } from 'antd'
function Payment(props) {

    const [isCreditApplied, setIsCreditApplied] = useState(false)


    function applyCredit(invoiceId) {
        setIsCreditApplied(!isCreditApplied);
    }

    function onOk() {
        debugger;
        if (isCreditApplied) {
            props.onOk(props.paymentData.vendorId, props.paymentData.amountBal);
        } else {
            props.onOk();
        }
    }
    return (
        <Modal
            title={props.title}
            visible={props.visible}
            onOk={onOk}
            onCancel={props.onCancel}
        >
            <div>
                <h4><strong>Product</strong>: {props.paymentData.product}</h4>
                <h4><strong>Quantity</strong> : {props.paymentData.quantity}</h4>
                <h4><strong>Available Credit </strong> : {props.paymentData.creditBal}</h4>
                <h4><strong>Amount Bal </strong> : {props.paymentData.amountBal}</h4>
                <h4><strong>Amount Due </strong> : {props.paymentData.amountDue}</h4>
                {
                    // Credit Section
                    props.paymentData.creditBal > 0 &&
                    <Checkbox onChange={() => applyCredit(props.paymentData.invoiceId)}>Do you wish to apply credit</Checkbox>
                }
            </div>
        </Modal>
    )
}

export default Payment
