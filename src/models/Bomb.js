import { ethers } from "ethers";
const { ethereum } = window;

function Bomb(tokenId, pic) {
    this.tokenId = tokenId;
    this.pic = pic;
}

Bomb.bombInfo = async function (game, token) {
    const t = new ethers.providers.JsonRpcProvider(game.RPC);
    let gameContract = new ethers.Contract(game.gameAddress, game.ABI, t);
    return await gameContract.getBombInfo(token);
}

Bomb.resetBomb = async function (game, signer, bomb) {
    //provider = new ethers.providers.Web3Provider(window.ethereum);
    //let signer = this.provider.getSigner();
    console.log(signer)
    let gameContract = new ethers.Contract(game.gameAddress, game.ABI, signer);
    try {
        if (ethereum) {
            let n = await gameContract.resetBomb(bomb);
            await n.wait();
            console.log(`https://snowtrace.io/tx/${n.hash}`);
            return "Updating Bomb... This takes about 30 seconds.";
        } else console.log("Ethereum object doesn't exist!");
    } catch (t) {
        console.log(t);
        return t.data.message;
    }
}

Bomb.activateBomb = async function (game, wallet, bomb) {
    //provider = new ethers.providers.Web3Provider(window.ethereum);
    //let signer = this.provider.getSigner();
    let gameContract = new ethers.Contract(game.gameAddress, game.ABI, wallet.signer);
    try {
        if (ethereum) {
            let amount = 0;
            if (game.chargeERC20 && !game.feeERC20) {
                amount = game.fee;
            } else if (!game.chargeERC20 && !game.feeERC20) {
                amount = game.cost + game.fee;
            } else if (!game.chargeERC20 && game.feeERC20) {
                amount = game.cost;
            }
            let n = await gameContract.activateBomb(bomb, { value: ethers.utils.parseEther(amount.toString()) });
            await n.wait();
            console.log(`https://snowtrace.io/tx/${n.hash}`);
            return "Updating Bomb...";
        } else console.log("Ethereum object doesn't exist!");
    } catch (t) {
        console.log(t);
        return t.data.message;
    }
}

Bomb.haltGame = async function (game, wallet, bomb) {
    //provider = new ethers.providers.Web3Provider(window.ethereum);
    //let signer = this.provider.getSigner();
    let gameContract = new ethers.Contract(game.gameAddress, game.ABI, wallet.signer);
    try {
        if (ethereum) {
            let n = await gameContract.haltGame(bomb);
            await n.wait();
            console.log(`https://snowtrace.io/tx/${n.hash}`);
            return `https://snowtrace.io/tx/${n.hash}`;
        } else console.log("Ethereum object doesn't exist!");
    } catch (t) {
        console.log(t);
        return t.data.message;
    }
}

export default Bomb;