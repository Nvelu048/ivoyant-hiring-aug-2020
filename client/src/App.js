import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from "axios";
import { Modal } from 'antd';
import { Table, Credit, Payment } from './Components';

export const DataContext = React.createContext(null);

function App() {

  const [tableData, setTableData] = useState([]);
  const [callTwoResponse, setCallTwoResponse] = useState([]);
  const [callThreeResponse, setCallThreeResponse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [showPaymentSection, setShowPaymentSection] = useState(false);


  useEffect(() => {
    async function makeNetworkRequest() {
      try {
        let callTwo = await Axios.get('/invoices');
        setCallTwoResponse(callTwo.data);

        try {
          let callThree = await Axios.get('/vendors')
          setCallThreeResponse(callThree.data)
          formData(callTwo.data, callThree.data);

        } catch (error) {
          console.log(`Error in call 3 ${"call 3"}`)
        }
      } catch (err) {
        console.log("Error in call 2")
      }
    }
    makeNetworkRequest();

  }, [])

  function formData(dataOne, dataTwo) {
    const tableData = [];

    dataOne.forEach((callTwoDatum) => {
      const filteredData = dataTwo.filter((callThreeDatum) => callThreeDatum["vendorId"] == callTwoDatum["vendorId"]);
      filteredData.forEach(filterData => {
        tableData.push({ ...callTwoDatum, ...filterData })
      })
    });
    setTableData(tableData);

  }

  const onPayment = (data) => {
    setPaymentData(data);
    console.log(data);
    setShowModal(true);
  }

  function toggleModal() {
    setShowModal(!showModal)
  }

  function togglePaymentSection() {
    setShowPaymentSection(!showPaymentSection)
  }

  async function onOkCredit(vendorId, amountToCredit) {
    debugger;
    try {
      const response = await Axios.post('/credit/apply')
      console.log(response.data)
      if (vendorId && amountToCredit) {
        debugger;
        let callThreeData = callThreeResponse
        callThreeData
          .filter(call3Data => call3Data['vendorId'] === vendorId).map(data => {
            data['creditBal'] = Number(amountToCredit) - Number(data['creditBal']);
            return data;
          });
        let _callThreeData = callThreeResponse.filter(call3Data => call3Data['vendorId'] !== vendorId)
        let callTwoData = callTwoResponse
        callTwoData = callTwoData
          .filter(call2Data => call2Data['vendorId'] === vendorId)
          .map(data => {
            if (data['amountDue'] <= 0) {
              return data;
            }
            data['amountBal'] = Number(amountToCredit) - Number(data['amountBal']);
            data['amountDue'] = Number(amountToCredit) - Number(data['amountDue']);
            console.log(data);
            return data;
          });
        let _callTwoData = callTwoResponse
          .filter(call2Data => call2Data['vendorId'] !== vendorId)
        setCallTwoResponse(callTwoData.concat(_callTwoData))
        setCallThreeResponse(callThreeData.concat(_callThreeData))
        formData(callTwoResponse, callThreeResponse)
      }
    } catch (err) {
      console.log('error occurred in applying credit')
    }
    toggleModal();
    togglePaymentSection();
  }

  async function onOkPayment() {
    try {
      const response = await Axios.post('/payment')
      console.log(response.data)
    } catch (err) {
      console.log('error occurred in payment')
    }
    togglePaymentSection();
  }

  return (

    <div className="App">
      {tableData &&
        <Table tableData={tableData} onPayment={onPayment} />
      }

      <Credit title="Credit Section" visible={showModal} onOk={onOkCredit} onCancel={toggleModal} paymentData={paymentData} />

      <Modal
        title="Payment Section"
        visible={showPaymentSection}
        onOk={onOkPayment}
        onCancel={togglePaymentSection}
      >
        <Payment paymentData={paymentData} />
      </Modal>
    </div >

  );
}

export default App;
