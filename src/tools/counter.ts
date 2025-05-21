import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as dotenv from "dotenv";
import { Account, constants, Contract, RpcProvider } from "starknet";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const accountAddress = process.env.ACCOUNT_ADDRESS;
const counterAddress = process.env.COUNTER_ADDRESS;

if (!privateKey || !accountAddress || !counterAddress) {
    throw new Error(
        "PRIVATE_KEY and ACCOUNT_ADDRESS and COUNTER_ADDRESS must be set"
    );
}

const myProvider = new RpcProvider({
    // nodeUrl: constants.NetworkName.SN_SEPOLIA,
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/",
});

const account = new Account(
    myProvider,
    accountAddress,
    privateKey,
    undefined,
    constants.TRANSACTION_VERSION.V3
);

export const counterArgs = {};

export const increaseCounter: ToolCallback<typeof counterArgs> = async (
    args
) => {
    const { abi: counterABI } = await myProvider.getClassAt(counterAddress);

    const counterContract = new Contract(
        counterABI,
        counterAddress,
        myProvider
    );

    const call = counterContract.populate("increase_counter", []);
    const { transaction_hash: txHash } = await account.execute(call, {
        version: constants.TRANSACTION_VERSION.V3,
    });

    await myProvider.waitForTransaction(txHash);

    const value = await counterContract.get_counter();

    return {
        content: [
            {
                type: "text",
                text: value.toString(),
            },
        ],
    };
};
