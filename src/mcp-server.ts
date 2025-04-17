import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { calculateSM3, sm3Args } from "./tools/sm3";
import {
    base64Decode,
    base64DecodeArgs,
    base64Encode,
    base64EncodeArgs,
} from "./tools/base64";

export const server = new McpServer({
    name: "mcp-crypto-tools",
    version: "0.0.1",
    description: "JS MCP Crypto Tools",
});

server.tool(
    "calculate-sm3-hash",
    "calculate sm3 hash value",
    sm3Args,
    calculateSM3
);

server.tool(
    "encode-base64",
    "encode string to base64",
    base64EncodeArgs,
    base64Encode
);

server.tool(
    "decode-base64",
    "decode base64 string to string",
    base64DecodeArgs,
    base64Decode
);
