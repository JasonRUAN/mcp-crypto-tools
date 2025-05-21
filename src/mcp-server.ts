import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { counterArgs, increaseCounter } from "./tools/counter";

export const server = new McpServer({
    name: "starknet-ai-goal-mcp",
    version: "0.0.1",
    description: "Starknet AI Goal MCP",
});

server.tool(
    "increase-counter",
    "increase counter",
    counterArgs,
    increaseCounter
);
