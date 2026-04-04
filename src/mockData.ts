import { Session } from './types';

export const mockSessions: Session[] = [
  {
    id: 'sess_1',
    title: '修复 React Native 滑动误触问题',
    firstPrompt: '在 FlatList 中嵌套 ScrollView 时，安卓端经常出现滑动误触，导致外层列表无法滚动，怎么解决？',
    summary: '分析了 RN 触摸事件分发机制，通过调整 nestedScrollEnabled 和 hitSlop 属性，并引入 PanResponder 拦截手势，最终解决了嵌套滚动冲突。',
    updatedAt: '2026-04-04T10:15:00Z',
    lastOpenedAt: '2026-04-04T10:20:00Z',
    projectPath: '~/Workspace/mobile-app',
    projectName: 'mobile-app',
    turnCount: 8,
    resumeCount: 3,
    isStarred: true,
    isArchived: false,
    tags: ['故障排查', '前端', 'React Native'],
    model: 'claude-3.5-sonnet',
    branch: 'fix/scroll-conflict',
    turns: [
      {
        id: 't1',
        role: 'user',
        content: '在 FlatList 中嵌套 ScrollView 时，安卓端经常出现滑动误触，导致外层列表无法滚动，怎么解决？',
        timestamp: '10:05 AM'
      },
      {
        id: 't2',
        role: 'assistant',
        content: '这是一个经典的 React Native 手势冲突问题。在 Android 上，内层的 `ScrollView` 默认会拦截所有的触摸事件。你可以尝试以下几个方案：\n\n1. 为内层 `ScrollView` 添加 `nestedScrollEnabled={true}` 属性。\n2. 如果是复杂的嵌套，可能需要使用 `react-native-gesture-handler` 替代原生的组件。',
        timestamp: '10:05 AM'
      },
      {
        id: 't3',
        role: 'user',
        content: '加了 nestedScrollEnabled 还是不行，外层 FlatList 依然很难触发滚动。',
        timestamp: '10:08 AM'
      },
      {
        id: 't4',
        role: 'tool',
        toolName: 'search_codebase',
        content: 'Searched for "FlatList" and "ScrollView" in ~/Workspace/mobile-app/src/components',
        timestamp: '10:08 AM'
      },
      {
        id: 't5',
        role: 'assistant',
        content: '我查看了你的代码，发现外层 `FlatList` 的 item 内部不仅有 `ScrollView`，还有 `TouchableOpacity`。这种多层嵌套会导致手势竞争。建议我们重写这一块的事件响应，使用 `PanResponder` 来手动判断滑动方向，如果是横向滑动则交给内层，纵向则交给外层。',
        timestamp: '10:09 AM'
      }
    ]
  },
  {
    id: 'sess_2',
    title: '调研 Codex 会话管理方案',
    firstPrompt: '我想做一个本地的 Codex 会话管理器，用什么技术栈比较好？要求跨平台、轻量、启动快。',
    summary: '对比了 Electron, Tauri 和纯 Web 方案。最终决定采用 Tauri + React + TailwindCSS，兼顾了 Web 生态的开发效率和 Rust 的底层性能及极小的包体积。',
    updatedAt: '2026-04-03T16:30:00Z',
    lastOpenedAt: '2026-04-03T17:00:00Z',
    projectPath: '~/Workspace/codex-manager',
    projectName: 'codex-manager',
    turnCount: 12,
    resumeCount: 1,
    isStarred: false,
    isArchived: false,
    tags: ['需求分析', '架构设计', 'Rust'],
    model: 'gemini-3.1-pro-preview',
    branch: 'main',
    turns: [
      {
        id: 't1',
        role: 'user',
        content: '我想做一个本地的 Codex 会话管理器，用什么技术栈比较好？要求跨平台、轻量、启动快。',
        timestamp: 'Apr 3, 4:00 PM'
      },
      {
        id: 't2',
        role: 'assistant',
        content: '针对“跨平台、轻量、启动快”这三个核心诉求，我推荐以下几个技术栈选项：\n\n1. **Tauri (Rust + Web前端)**：目前最符合“轻量、启动快”要求的跨平台框架。打包体积通常在几MB，内存占用极低。\n2. **Wails (Go + Web前端)**：如果你对 Go 更熟悉，这是一个很好的替代方案，性能和体积与 Tauri 相当。\n3. **Electron**：生态最成熟，但包体积大（通常 100MB+），内存占用较高，不符合“轻量”的要求。',
        timestamp: 'Apr 3, 4:01 PM'
      }
    ]
  },
  {
    id: 'sess_3',
    title: '部署 cloudflare_temp_email',
    firstPrompt: '帮我写一个 Cloudflare Worker 脚本，实现一个临时邮箱接收服务，将收到的邮件转发到我的 Telegram 机器人。',
    summary: '编写了基于 Cloudflare Email Routing 的 Worker 脚本，集成了 Telegram Bot API，实现了邮件解析和即时转发功能，并处理了长邮件的分段发送。',
    updatedAt: '2026-04-02T09:12:00Z',
    lastOpenedAt: '2026-04-02T10:00:00Z',
    projectPath: '~/Projects/cf-temp-email',
    projectName: 'cf-temp-email',
    turnCount: 5,
    resumeCount: 4,
    isStarred: true,
    isArchived: false,
    tags: ['部署运维', 'Serverless', 'Cloudflare'],
    model: 'gemini-3.1-pro-preview',
    branch: 'feature/tg-bot',
    turns: [
      {
        id: 't1',
        role: 'user',
        content: '帮我写一个 Cloudflare Worker 脚本，实现一个临时邮箱接收服务，将收到的邮件转发到我的 Telegram 机器人。',
        timestamp: 'Apr 2, 9:00 AM'
      },
      {
        id: 't2',
        role: 'assistant',
        content: '好的，我们需要使用 Cloudflare Email Routing 的 `email` 事件。首先，你需要准备好 Telegram Bot Token 和你的 Chat ID。下面是 Worker 的核心代码...',
        timestamp: 'Apr 2, 9:01 AM'
      }
    ]
  },
  {
    id: 'sess_4',
    title: '分析 .codex / .claude 历史会话',
    firstPrompt: '写一个 Python 脚本，遍历 ~/.codex 目录下的所有 JSON 文件，提取其中的 prompt 和 response，并统计最常用的关键词。',
    summary: '使用 Python 的 pathlib 和 json 模块解析本地会话文件，结合 jieba 分词和 collections.Counter 实现了高频词统计，并输出了 CSV 报告。',
    updatedAt: '2026-04-01T21:45:00Z',
    lastOpenedAt: '2026-04-01T22:00:00Z',
    projectPath: '~/Scripts/ai-analytics',
    projectName: 'ai-analytics',
    turnCount: 4,
    resumeCount: 0,
    isStarred: false,
    isArchived: false,
    tags: ['实验研究', 'Python', '数据分析'],
    model: 'claude-3-opus',
    branch: 'main',
    turns: [
      {
        id: 't1',
        role: 'user',
        content: '写一个 Python 脚本，遍历 ~/.codex 目录下的所有 JSON 文件，提取其中的 prompt 和 response，并统计最常用的关键词。',
        timestamp: 'Apr 1, 9:30 PM'
      }
    ]
  },
  {
    id: 'sess_5',
    title: '排查 mac mini 磁盘空间告急',
    firstPrompt: '我的 Mac Mini 磁盘空间突然只剩 5GB 了，有什么命令行工具可以快速找出占用空间最大的大文件和隐藏目录？',
    summary: '使用 ncdu 和 find 命令定位到了 Docker 遗留的悬空镜像和 Xcode 缓存，清理后释放了 80GB 空间。编写了定期清理脚本。',
    updatedAt: '2026-03-28T14:20:00Z',
    lastOpenedAt: '2026-03-28T15:00:00Z',
    projectPath: '~/',
    projectName: 'system-ops',
    turnCount: 6,
    resumeCount: 1,
    isStarred: false,
    isArchived: true,
    tags: ['故障排查', 'macOS', 'Shell'],
    model: 'gemini-3.1-flash-preview',
    branch: '-',
    turns: [
      {
        id: 't1',
        role: 'user',
        content: '我的 Mac Mini 磁盘空间突然只剩 5GB 了，有什么命令行工具可以快速找出占用空间最大的大文件和隐藏目录？',
        timestamp: 'Mar 28, 2:00 PM'
      }
    ]
  },
  {
    id: 'sess_6',
    title: '统一 AI API 网关接入方案',
    firstPrompt: '我们团队现在用了 OpenAI, Anthropic 和 Gemini 的 API，每个 SDK 都不一样，我想在后端做一层统一的网关，有什么开源方案推荐，或者自己写的架构建议？',
    summary: '评估了 LiteLLM 和 OneAPI。最终决定基于 LiteLLM 搭建内部网关，统一了请求格式，并增加了基于 Redis 的速率限制和成本统计中间件。',
    updatedAt: '2026-03-25T11:05:00Z',
    lastOpenedAt: '2026-03-26T09:00:00Z',
    projectPath: '~/Workspace/ai-gateway',
    projectName: 'ai-gateway',
    turnCount: 15,
    resumeCount: 8,
    isStarred: true,
    isArchived: false,
    tags: ['架构设计', '后端', 'API'],
    model: 'gemini-3.1-pro-preview',
    branch: 'feat/litellm-integration',
    turns: [
      {
        id: 't1',
        role: 'user',
        content: '我们团队现在用了 OpenAI, Anthropic 和 Gemini 的 API，每个 SDK 都不一样，我想在后端做一层统一的网关，有什么开源方案推荐，或者自己写的架构建议？',
        timestamp: 'Mar 25, 10:00 AM'
      }
    ]
  }
];
