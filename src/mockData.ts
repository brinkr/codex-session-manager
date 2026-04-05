import { SessionRecord } from './types';

export const mockSessions: SessionRecord[] = [
  {
    raw: {
      sessionId: 'sess-1',
      sourcePath: '/Users/uhlan/.codex/sessions/sess-1.json',
      cwd: '/Users/uhlan/projects/mobile-app',
      projectPath: '/Users/uhlan/projects/mobile-app',
      projectName: 'mobile-app',
      branch: 'fix/scroll-bug',
      model: 'gemini-3.1-pro-preview',
      createdAt: '2026-04-05T09:00:00Z',
      updatedAt: '2026-04-05T09:30:00Z',
      turnCount: 12,
      firstUserMessage: 'The scroll view in the React Native app is sometimes triggering a tap event when the user is just trying to scroll. How can we fix this?',
      messages: [
        { id: 'm1', role: 'user', content: 'The scroll view in the React Native app is sometimes triggering a tap event when the user is just trying to scroll. How can we fix this?', createdAt: '2026-04-05T09:00:00Z' },
        { id: 'm2', role: 'assistant', content: 'This is a common issue in React Native. It usually happens when the `PanResponder` or touch handlers on child elements are too sensitive. We can fix this by adjusting the `delayPressIn` or using `onScrollBeginDrag` to cancel pending taps.', createdAt: '2026-04-05T09:01:00Z' },
        { id: 'm3', role: 'tool', toolName: 'grep', content: 'Searching for ScrollView usages...', createdAt: '2026-04-05T09:01:30Z', toolStatus: 'completed' },
        { id: 'm4', role: 'assistant', content: 'I found the `FeedList` component uses a `ScrollView` with `TouchableHighlight` children. Let\'s wrap the children in a component that better handles the touch cancellation.', createdAt: '2026-04-05T09:02:00Z' }
      ]
    },
    derived: {
      fallbackTitle: 'Fix React Native scroll view tap issue',
      snippet: 'I found the FeedList component uses a ScrollView with TouchableHighlight children...',
      basicKeywords: ['react-native', 'scroll', 'tap', 'bug'],
      pathSegments: ['projects', 'mobile-app'],
      hasToolCalls: true,
      activityLevel: 'high'
    },
    ai: {
      summary: {
        status: 'completed',
        aiTitle: '修复 React Native 滑动误触问题',
        summary: 'Investigated and resolved an issue where scrolling a `ScrollView` in React Native would accidentally trigger tap events on child `TouchableHighlight` components.',
        summaryBullets: [
          'Identified `FeedList` as the problematic component.',
          'Suggested adjusting `delayPressIn` or touch cancellation logic.',
          'Implemented a wrapper to handle touch cancellation during scroll.'
        ],
        resumeRecommendation: 'Review the changes in `FeedList.tsx` and test on a physical device.',
        generatedAt: '2026-04-05T09:31:00Z',
        generator: 'local-model',
        messageCountAtGeneration: 12
      },
      tags: {
        status: 'completed',
        autoTags: ['react-native', 'bugfix', 'ui'],
        scenarioClassification: 'frontend',
        generatedAt: '2026-04-05T09:31:00Z'
      },
      related: {
        status: 'completed',
        relatedSessionIds: ['sess-2'],
        generatedAt: '2026-04-05T09:31:00Z'
      }
    },
    user: {
      manualTags: ['urgent'],
      suppressedAutoTags: [],
      starred: true,
      archived: false,
      pinned: false,
      note: 'Need to verify this fix on Android as well, it was only tested on iOS.',
      lastOpenedAt: '2026-04-05T10:00:00Z',
      resumeCount: 2
    }
  },
  {
    raw: {
      sessionId: 'sess-2',
      sourcePath: '/Users/uhlan/.codex/sessions/sess-2.json',
      cwd: '/Users/uhlan/projects/codex-core',
      projectPath: '/Users/uhlan/projects/codex-core',
      projectName: 'codex-core',
      branch: 'feature/session-mgmt',
      model: 'gemini-3.1-pro-preview',
      createdAt: '2026-04-04T14:00:00Z',
      updatedAt: '2026-04-04T16:00:00Z',
      turnCount: 45,
      firstUserMessage: 'We need to design a robust session management system for Codex. It needs to handle local file storage, AI summarization, and fast searching.',
      messages: [
        { id: 'm1', role: 'user', content: 'We need to design a robust session management system for Codex. It needs to handle local file storage, AI summarization, and fast searching.', createdAt: '2026-04-04T14:00:00Z' },
        { id: 'm2', role: 'assistant', content: 'Let\'s break this down. For local storage, we can use a file-based approach with JSON or SQLite. For searching, a local index like lunr.js or a simple SQLite FTS would work.', createdAt: '2026-04-04T14:05:00Z' }
      ]
    },
    derived: {
      fallbackTitle: 'Design Codex session management',
      snippet: 'Let\'s break this down. For local storage, we can use a file-based approach...',
      basicKeywords: ['design', 'session', 'storage', 'search'],
      pathSegments: ['projects', 'codex-core'],
      hasToolCalls: false,
      activityLevel: 'high'
    },
    ai: {
      summary: {
        status: 'generating'
      },
      tags: {
        status: 'generating',
        autoTags: []
      },
      related: {
        status: 'none',
        relatedSessionIds: []
      }
    },
    user: {
      manualTitle: '调研 Codex 会话管理方案',
      manualTags: ['architecture', 'planning'],
      suppressedAutoTags: [],
      starred: false,
      archived: false,
      pinned: true,
      resumeCount: 5
    }
  },
  {
    raw: {
      sessionId: 'sess-3',
      sourcePath: '/Users/uhlan/.codex/sessions/sess-3.json',
      cwd: '/Users/uhlan/infra/email-service',
      projectPath: '/Users/uhlan/infra/email-service',
      projectName: 'email-service',
      createdAt: '2026-04-03T10:00:00Z',
      updatedAt: '2026-04-03T11:00:00Z',
      turnCount: 8,
      firstUserMessage: 'Help me deploy a temporary email service using Cloudflare Workers.',
      messages: [
        { id: 'm1', role: 'user', content: 'Help me deploy a temporary email service using Cloudflare Workers.', createdAt: '2026-04-03T10:00:00Z' },
        { id: 'm2', role: 'assistant', content: 'Sure, we can use Cloudflare Email Routing and a Worker to process incoming emails and store them temporarily in Workers KV.', createdAt: '2026-04-03T10:02:00Z' }
      ]
    },
    derived: {
      fallbackTitle: 'Deploy temp email on Cloudflare',
      snippet: 'Sure, we can use Cloudflare Email Routing and a Worker to process incoming emails...',
      basicKeywords: ['cloudflare', 'email', 'worker', 'deploy'],
      pathSegments: ['infra', 'email-service'],
      hasToolCalls: false,
      activityLevel: 'medium'
    },
    ai: {
      summary: {
        status: 'failed',
        errorMessage: 'Context length exceeded during summarization.'
      },
      tags: {
        status: 'completed',
        autoTags: ['cloudflare', 'serverless'],
        scenarioClassification: 'devops',
        generatedAt: '2026-04-03T11:05:00Z'
      },
      related: {
        status: 'none',
        relatedSessionIds: []
      }
    },
    user: {
      manualTitle: '部署 cloudflare_temp_email',
      manualTags: [],
      suppressedAutoTags: [],
      starred: false,
      archived: true,
      pinned: false,
      resumeCount: 1
    }
  },
  {
    raw: {
      sessionId: 'sess-4',
      sourcePath: '/Users/uhlan/.codex/sessions/sess-4.json',
      cwd: '/Users/uhlan/scripts/history-analyzer',
      projectPath: '/Users/uhlan/scripts/history-analyzer',
      projectName: 'history-analyzer',
      createdAt: '2026-04-02T16:00:00Z',
      updatedAt: '2026-04-02T17:30:00Z',
      turnCount: 22,
      firstUserMessage: 'I want to write a script to analyze my past chat history from .codex and .claude folders to find common patterns.',
      messages: [
        { id: 'm1', role: 'user', content: 'I want to write a script to analyze my past chat history from .codex and .claude folders to find common patterns.', createdAt: '2026-04-02T16:00:00Z' }
      ]
    },
    derived: {
      fallbackTitle: 'Analyze chat history scripts',
      snippet: 'I want to write a script to analyze my past chat history from .codex and .claude folders...',
      basicKeywords: ['script', 'analyze', 'history', 'codex', 'claude'],
      pathSegments: ['scripts', 'history-analyzer'],
      hasToolCalls: true,
      activityLevel: 'medium'
    },
    ai: {
      summary: {
        status: 'none'
      },
      tags: {
        status: 'none',
        autoTags: []
      },
      related: {
        status: 'none',
        relatedSessionIds: []
      }
    },
    user: {
      manualTitle: '分析 .codex / .claude 历史会话',
      manualTags: ['scripting', 'data-analysis'],
      suppressedAutoTags: [],
      starred: false,
      archived: false,
      pinned: false,
      resumeCount: 0
    }
  },
  {
    raw: {
      sessionId: 'sess-5',
      sourcePath: '/Users/uhlan/.codex/sessions/sess-5.json',
      cwd: '/Users/uhlan',
      projectPath: '/Users/uhlan',
      projectName: 'system',
      createdAt: '2026-04-01T08:00:00Z',
      updatedAt: '2026-04-01T09:15:00Z',
      turnCount: 15,
      firstUserMessage: 'My mac mini is running out of disk space. Help me find what is taking up so much room.',
      messages: [
        { id: 'm1', role: 'user', content: 'My mac mini is running out of disk space. Help me find what is taking up so much room.', createdAt: '2026-04-01T08:00:00Z' },
        { id: 'm2', role: 'tool', toolName: 'shell', content: 'Running `du -sh * | sort -hr`...', createdAt: '2026-04-01T08:01:00Z', toolStatus: 'completed' },
        { id: 'm3', role: 'assistant', content: 'It looks like Docker images and some old Xcode caches are taking up over 100GB. We can clean these up.', createdAt: '2026-04-01T08:02:00Z' }
      ]
    },
    derived: {
      fallbackTitle: 'Mac mini disk space issue',
      snippet: 'It looks like Docker images and some old Xcode caches are taking up over 100GB...',
      basicKeywords: ['mac', 'disk', 'space', 'cleanup'],
      pathSegments: ['system'],
      hasToolCalls: true,
      activityLevel: 'low'
    },
    ai: {
      summary: {
        status: 'completed',
        aiTitle: '排查 mac mini 磁盘空间告急',
        summary: 'Identified and cleaned up large files consuming disk space on the Mac Mini.',
        summaryBullets: [
          'Used `du` to find large directories.',
          'Cleared Docker image cache.',
          'Removed old Xcode derived data.'
        ],
        generatedAt: '2026-04-01T08:30:00Z',
        generator: 'local-model',
        messageCountAtGeneration: 10 // Stale! turnCount is 15
      },
      tags: {
        status: 'completed',
        autoTags: ['macos', 'maintenance', 'docker'],
        scenarioClassification: 'troubleshooting',
        generatedAt: '2026-04-01T08:30:00Z'
      },
      related: {
        status: 'none',
        relatedSessionIds: []
      }
    },
    user: {
      manualTags: [],
      suppressedAutoTags: [],
      starred: false,
      archived: false,
      pinned: false,
      resumeCount: 1
    }
  },
  {
    raw: {
      sessionId: 'sess-6',
      sourcePath: '/Users/uhlan/.codex/sessions/sess-6.json',
      cwd: '/Users/uhlan/projects/api-gateway',
      projectPath: '/Users/uhlan/projects/api-gateway',
      projectName: 'api-gateway',
      createdAt: '2026-03-28T11:00:00Z',
      updatedAt: '2026-03-29T14:00:00Z',
      turnCount: 56,
      firstUserMessage: 'We need to unify how we access different AI APIs (OpenAI, Anthropic, Gemini) into a single internal gateway.',
      messages: [
        { id: 'm1', role: 'user', content: 'We need to unify how we access different AI APIs (OpenAI, Anthropic, Gemini) into a single internal gateway.', createdAt: '2026-03-28T11:00:00Z' }
      ]
    },
    derived: {
      fallbackTitle: 'Unify AI API access',
      snippet: 'We need to unify how we access different AI APIs (OpenAI, Anthropic, Gemini)...',
      basicKeywords: ['api', 'gateway', 'ai', 'unify'],
      pathSegments: ['projects', 'api-gateway'],
      hasToolCalls: false,
      activityLevel: 'high'
    },
    ai: {
      summary: {
        status: 'completed',
        aiTitle: '统一 AI API 网关接入方案',
        summary: 'Designed an internal API gateway to standardize requests to various LLM providers.',
        summaryBullets: [
          'Defined a common request/response schema.',
          'Implemented rate limiting and cost tracking per provider.',
          'Added fallback logic for high-availability.'
        ],
        generatedAt: '2026-03-29T14:05:00Z',
        generator: 'company-gateway',
        messageCountAtGeneration: 56
      },
      tags: {
        status: 'completed',
        autoTags: ['api-design', 'backend', 'llm'],
        scenarioClassification: 'architecture',
        generatedAt: '2026-03-29T14:05:00Z'
      },
      related: {
        status: 'none',
        relatedSessionIds: []
      }
    },
    user: {
      manualTitle: '统一 AI API 网关接入方案',
      manualTags: ['important'],
      suppressedAutoTags: [],
      starred: true,
      archived: false,
      pinned: false,
      resumeCount: 8
    }
  }
];
