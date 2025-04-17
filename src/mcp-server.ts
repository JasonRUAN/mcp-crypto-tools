import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { calculateSM3, sm3Args } from "./tools/sm3";

export const server = new McpServer({
    name: "js-mcp-crypto-tools",
    version: "0.0.1",
    description: "JS MCP Crypto Tools",
});

server.tool(
    "calculate-sm3-hash",
    "calculate sm3 hash value",
    sm3Args,
    calculateSM3
);
