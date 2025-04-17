import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const base64EncodeArgs = {
    value: z.string().describe("The string to encode to base64"),
};

export const base64DecodeArgs = {
    value: z.string().describe("The base64 string to decode"),
};

export const base64Encode: ToolCallback<typeof base64EncodeArgs> = async (
    args
) => {
    const { value } = args;

    const encodedValue = Buffer.from(value).toString("base64");

    return {
        content: [
            {
                type: "text",
                text: encodedValue,
            },
        ],
    };
};

export const base64Decode: ToolCallback<typeof base64DecodeArgs> = async (
    args
) => {
    const { value } = args;

    try {
        const decodedValue = Buffer.from(value, "base64").toString("utf-8");
        return {
            content: [
                {
                    type: "text",
                    text: decodedValue,
                },
            ],
        };
    } catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: "Error: Invalid base64 string",
                },
            ],
        };
    }
};
