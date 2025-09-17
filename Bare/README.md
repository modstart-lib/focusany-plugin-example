# Bare FocusAny 插件示例

## 🔧 基于已有项目二次开发

如果你需要基于一个已有项目进行二次开发，将其改造成 FocusAny 插件，可以按照以下步骤操作：

1. **复制插件资源**：将 `focusany-plugin` 文件夹中的所有文件复制到你的前端项目的 `public/` 目录（公开静态资源访问目录）中。

2. **修改配置**：根据你的项目需求，编辑 `config.json` 文件，更新插件名称、版本、描述等信息。

3. **集成业务逻辑**：在 `backend.cjs` 中添加或修改后端逻辑，以适配你的项目功能。

4. **更新界面**：如果需要自定义界面，可以修改 `index.html` 或相关前端文件。

5. **测试和部署**：将修改后的 `focusany-plugin` 文件夹复制到 FocusAny 插件目录，重启应用进行测试。

这样可以快速地将一个已有项目改造成 FocusAny 插件，无需从零开始开发。

## 📚 相关文档

- [FocusAny 插件开发文档](https://focusany.com/doc)
- [插件配置规范](https://focusany.com/sdk/config.schema.json)
