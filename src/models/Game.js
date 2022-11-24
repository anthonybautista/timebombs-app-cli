import { ethers } from "ethers";

function Game(gameId,
              nftAddress,
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
              feeERC20,
              activeBombs) {
    this.gameId = gameId;
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
    this.activeBombs = activeBombs;
}

Game.setUpGame = async function (gameId, RPC, ABI) {
    const t = new ethers.providers.JsonRpcProvider(RPC);
    // TODO setup gameId => address lookup
    let address = "0x38C1Acc7bb26CD108E4DA34eC8CD48D05e02271f";
    let gameContract = new ethers.Contract(address, ABI, t);
    let data = await gameContract.getGameInfo();
    let activeBombs = await gameContract.getActiveBombs();

    return new Game(gameId,
        data[1],
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
        data[16],
        activeBombs)
}

Game.getActive = async function (address, RPC, ABI) {
    const t = new ethers.providers.JsonRpcProvider(RPC);
    let gameContract = new ethers.Contract(address, ABI, t);
    return await gameContract.getActiveBombs();
}


export default Game;