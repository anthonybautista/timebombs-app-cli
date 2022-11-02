import { ethers } from "ethers";

function Game(nftAddress,
              gameAddress,
              RPC,
              ABI,
              cost,
              fee,
              maxSupply,
              resetInterval,
              startTime,
              maxPerAddress,
              safePercent,
              maxWinners,
              paused,
              gameOver,
              chargeERC20,
              feeERC20) {
    this.RPC = RPC;
    this.ABI = ABI;
    this.gameAddress = gameAddress;
    this.nftAddress = nftAddress;
    this.cost = cost;
    this.fee = fee;
    this.maxSupply = maxSupply;
    this.resetInterval = resetInterval;
    this.startTime = startTime;
    this.maxPerAddress = maxPerAddress;
    this.safePercent = safePercent;
    this.maxWinners = maxWinners;
    this.paused = paused;
    this.gameOver = gameOver;
    this.chargeERC20 = chargeERC20;
    this.feeERC20 = feeERC20;
}

Game.setUpGame = async function (address, RPC, ABI) {
    const t = new ethers.providers.JsonRpcProvider(RPC);
    let gameContract = new ethers.Contract(address, ABI, t);
    let data = await gameContract.getGameInfo();

    return new Game(data[1],
        address,
        RPC,
        ABI,
        Number(data[2]) / 10**18,
        Number(data[3]) / 10**18,
        Number(data[5]),
        Number(data[6]) * 1000,
        Number(data[7]) * 1000,
        data[9],
        data[10],
        data[11],
        data[13],
        data[14],
        data[15],
        data[16])
}

export default Game;