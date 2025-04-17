#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Command } from "commander";
import { server } from "./mcp-server";
import logger from "./logger";

const program = new Command();

class SessionTransport extends StdioServerTransport {
    public readonly sessionId = `session_${Date.now()}`;
}

program
    .command("stdio", {
        isDefault: true,
    })
    .action(async () => {
        try {
            const transport = new SessionTransport();
            await server.connect(transport);
            logger.info("MCP Server started successfully");
        } catch (error) {
            logger.error("Failed to start MCP Server:", error);
        }
    });

program.parse(process.argv);
