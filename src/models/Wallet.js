function Wallet(connected,
                alias,
                account,
                provider,
                signer,
                currentNetwork) {
    this.connected = connected;
    this.alias = alias;
    this.account = account;
    this.provider = provider;
    this.signer = signer;
    this.currentNetwork = currentNetwork;
}

export default Wallet;