import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";

export const writeFileArgs = {
    filePath: z.string().describe("文件路径"),
    content: z.string().describe("要写入文件的内容"),
};

export const writeFile: ToolCallback<typeof writeFileArgs> = async (args) => {
    const { filePath, content } = args;

    try {
        // 确保目录存在
        await fs.mkdir(path.dirname(filePath), { recursive: true });

        // 写入文件
        await fs.writeFile(filePath, content, "utf-8");

        return {
            content: [
                {
                    type: "text",
                    text: `成功写入文件: ${filePath}`,
                },
            ],
        };
    } catch (error: any) {
        throw new Error(`写入文件失败: ${error.message}`);
    }
};
