import "./App.css";
import CurrencyInput from "./CurrencyInput";
import { useState, useEffect } from "react";
//axios for communication with api
import axios from "axios";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("GBP");
  const [currency2, setCurrency2] = useState("USD");
  const [rates, setRates] = useState([]);

  //gets rates when page loads
  useEffect(() => {
    axios
      .get(
        "https://exchange-rates.abstractapi.com/v1/live/?api_key=98a05bebf1a442fbb55afc2dd8cbb4d3&base=USD"
      )
      .then((response) => {
        setRates(response.data.exchange_rates);
      });
  }, []);

  //calculates the default rates on page load and when rates change
  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, );


  //function to round to 4 decimal places
  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }


  return (
    <div>
      <h1>Currency Converter</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1} />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2} />
    </div>
  );
}

export default App;