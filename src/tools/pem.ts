import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { execSync } from "child_process";

export const pemArgs = {
    pemPath: z.string().describe("需解析的PEM证书文件的路径"),
};

function parseX509Certificate(pemPath: string): string {
    try {
        const output = execSync(`openssl x509 -noout -text -in "${pemPath}"`, {
            encoding: "utf8",
        });
        return output;
    } catch (error: any) {
        throw new Error(`解析X.509证书失败: ${error.message}`);
    }
}

export const parsePEM: ToolCallback<typeof pemArgs> = async (args) => {
    const { pemPath } = args;

    try {
        const detailedInfo = parseX509Certificate(pemPath);

        return {
            content: [
                {
                    type: "text",
                    text: detailedInfo,
                },
            ],
        };
    } catch (error: any) {
        return {
            content: [
                {
                    type: "text",
                    text: `解析PEM文件失败: ${error.message}`,
                },
            ],
        };
    }
};
