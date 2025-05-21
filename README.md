## 安装命令

```json
{
  "mcpServers": {
    "mcp-crypto-tools": {
        "command": "npx",
        "args": [
            "-y",
            "@jasonruan/mcp-crypto-tools@latest"
        ]
    }
  }
}
```

## 场景展示

### 场景1：从json日志中提取base64编码证书并解析

提取json日志中的base64编码的证书，进行解析后，写文件