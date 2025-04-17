import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const sm3 = require("sm-crypto").sm3;

export const sm3Args = {
    value: z.string().describe("The value to calculate to sm3 hash value"),
};

export const calculateSM3: ToolCallback<typeof sm3Args> = async (args) => {
    const { value } = args;

    const hashValue = sm3(value);

    return {
        content: [
            {
                type: "text",
                text: hashValue,
            },
        ],
    };
};
