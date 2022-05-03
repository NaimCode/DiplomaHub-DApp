import { InjectedConnector } from "@web3-react/injected-connector";

export const injector = new InjectedConnector({
  supportedChainsIds: [1, 42, 1337],
});
