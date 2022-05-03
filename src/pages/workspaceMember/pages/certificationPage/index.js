import { Web3ReactProvider } from "@web3-react/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";
import { MetaMaskProvider } from "../../../../web3/hooks";
import Checkout from "./checkout";
const CertificationPage = () => {
  const getLibrary = (provider, connector) => {
    return new Web3(provider);
  };
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <Checkout />
      </MetaMaskProvider>
    </Web3ReactProvider>
  );
};

export default CertificationPage;
