# Vue CLI 3 学习

## 基础用法

首先全局安装（建议）

```shell
npm i -g @vue/cli # yarn global add @vue/cli
```

安装完成后通过下面命令，检查是否安装成功

```shell
vue -V # 4.2.2
```

然后可以通过 `create` 命令创建 Vue 项目()

```shell
vue create <projectName>
```

## CLI 的命令

> 使用 `vue --help` 查看 CLI 支持的命令，使用 `vue <command> --help` 查看每个命令的详细信息

### create

> CLI 创建项目模板的命令。用法 `vue create [options] <projectName>`

Options：

- -p，--preset <presetName>： 使用本地保存或者远程的预设配置
- -d，--default：使用默认预设配置
- -i，--inlinePreset <json>：使用内联 JSON 格式预设
- -m，--packageManager <command>：安装依赖时使用指定的 npm 客户端
- -r，--registry <url>：使用指定的 npm 源，仅对 npm 有效
- -g，--git [message]：Git 初始化提交信息
- -n，--no-git：跳过 Git 初始化
- -f，--force：覆盖当前文件夹
- -c，--clone：在获取远程预设时使用 `git clone`
- -x，--proxy：在创建项目时设置代理
- -b，--bare：没有新手指导的脚手架
- --skipGetStarted：跳过显示”入门“说明
- -h，--help：打印使用信息

### add

> 添加项目插件并调用生成器。用法 `vue add [options] <plugins> [pluginsOptions]`

Options：

- --registry <url>：使用指定的 npm 源，仅对 npm 有效
- -h，--help：打印使用信息

### invoke

> 在项目中调用插件生成器。用法 `vue invoke [options] <plugin> [pluginOptions]`

Options：

- --registry <url>：使用指定的 npm 源，仅对 npm 有效
- -h，--help：打印使用信息

### inspect

> 使用 `vue-cli-service` 检查 webpack 配置。用法 `vue inspect [options] [paths...]`

Options：

- --mode <mode>：设置 webpack 的模式
- --rule <ruleName>：检查指定的模块规则
- --plugin <pluginname>：检查指定的插件
- --rules：列出所有的模块规则名称
- --plugins：列出所有的插件名称
- -v，--verbose：在输出中显示完整的功能定义
- -h，--help：打印使用信息

### serve

> 开发模式下，本地访问一个 `js/vue` 文件。用法 `vue serve [options] [entry]`

Options：

- -o，--open：打开浏览器
- -c，--copy：从粘贴板复制本地 URL
- -p，--port <port>：设置端口号，默认8080或者下一个可用端口
- -h，--help：打印使用信息

### build

> 生产模式下，打包一个 `js/vue` 文件。用法 `vue build [options] [entry]`

Options：

- -t， --target <target>：构建目标（app | lib | wc | wc-async，默认值：app）
- -n，--name <name>：lib 或 Web 组件模式的名称（默认值：入口文件名）
- -d，--dest <dir>：输出文件夹名称（默认：dist）

- -h，--help：打印使用信息

### ui

> 启动并打开 CLI 图形化工具。用法 `vue ui [options]`

Options：

- -H，--host <host>：设置 UI 工具的域名（默认值：default）
- -p，--post <port>：设置 UI 工具的端口号（默认值：8080 或者查找可用端口号）
- -D，--dev：启动开发模式
- --quit：不打印启动信息
- --headless：不在启动和输出端口上打开浏览器

- -h，--help：打印使用信息

### init

> 从远程模板生成一个项目，需要 `@vue/cli-init` 插件。用法 `vue init [options] <template> <projectName>`

Options：

- -c，--clone：使用 `git clone` 抓取远程模板
- --offline：使用缓存模板

- -h，--help：打印使用信息

### config

> 检查并修改配。用法 `vue config [options] [value]`

Options：

- -g，--get <path>：获取配置信息
- -s，--set <path> <value>：设置配置信息
- -d，--delete <path>：删除配置信息
- -e，--edit：编辑配置信息
- --json：将配置信息输入成 JSON 格式

- -h，--help：打印使用信息

### outdated

> 检查过时的 CLI 命令（试验阶段）。用法 `vue outdated [options]`

Options：

- --next：升级时还要检查alpha / beta / rc版本

- -h，--help：打印使用信息

### upgrade

>升级 CLI 服务/插件（试验阶段）。用法 `vue upgrade [options] [plugin-name] ` 

Options：

- -t，--to <version>：将插件升级到最新版本
- -f，--from <version>：如果已从指定版本升级，则跳过探测已安装的插件

- -r，--registry <url>：使用指定的 npm 源下载依赖
- --all：更新全部插件
- --next：升级时还要检查alpha / beta / rc版本
- -h，--help：打印使用信息

### info

> 打印本地环境调试信息。用法 `vue info [options]`

Options：

- -h，--help：打印使用信息



