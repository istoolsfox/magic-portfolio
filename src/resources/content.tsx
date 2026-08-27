import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { LetterFx } from "@once-ui-system/core";

const person: Person = {
  firstName: "ToolsFox",
  lastName: "",
  name: `ToolsFox`,
  role: "AI 应用工程师",
  avatar: "/images/avatar.png",
  email: "toolsfox@qq.com",
  location: "Asia/Shanghai", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["中文", "English"], // optional: Leave the array empty if you don't want to display languages
  locale: "zh", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>关于 AI 应用与自动化的实践笔记</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "WeChat",
    icon: "wechat",
    link: "/images/wechat-qr.jpg",
    essential: true,
  },
  {
    name: "Bonjour",
    icon: "bonjour",
    link: "https://bonjour.bio/toolsfox",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `ToolsFox – 个人主页`,
  description: `ToolsFox 的个人网站：AI 学习笔记、技术实践与生活分享`,
  headline: (
    <>
      <LetterFx trigger="instant" speed="fast">
        记录学习，
      </LetterFx>
      <br />
      <LetterFx trigger="instant" speed="fast">
        分享思考。
      </LetterFx>
    </>
  ),
  featured: {
    display: false,
    title: <>跨境电商全链路自动化</>,
    href: "/work/ecommerce-automation-system",
  },
  subline: (
    <>
      我是 ToolsFox，一名对 AI 和自动化感兴趣的工程师。这里是我的个人小站，
      记录我在 AI 应用、编程与日常生活中的学习笔记和一点思考。
    </>
  ),
  focus: ["AI 应用", "编程笔记", "读书思考", "生活随记"],
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `${person.name} 的个人介绍与学习经历`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "我的方向",
    description: (
      <>
        我关注如何将大语言模型转化为实际生产力。从企业业务流程自动化，到智能
        Agent，再到本地模型部署，我喜欢探索 AI 从模型能力到业务价值之间的连接。
        <br />
        <br />
        我认为 AI 的本质价值之一，是帮人过滤掉无用嘈杂的信息——就像滤除数据中的噪声，
        让沟通与决策更精简、更迅速。我的日常工作就是穿梭在各个业务部门之间：
        理解他们的业务流程与工作内容，设计自动化的 AI 工作流。传统模式下业务扩大意味着人员同步扩大，
        而现在 AI 可以过滤信息、自动产出方案与设计，人只需要做决策。
        <br />
        <br />
        我理解 Transformer、RAG 与 Agent 编排的底层原理，也是一名全栈开发者——前端、后端、
        服务器、数据库、网络、计算机硬件都在我的能力范围内。技术栈的宽度，是为了让 AI
        方案能真正端到端落地。
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "工作经历",
    experiences: [
      {
        company: "金豚达（杭州）数字",
        timeframe: "2026.06 – 至今",
        role: "AI 技术应用专家（电商）",
        achievements: [
          <>负责电商业务 AI 应用探索与落地，结合运营需求设计智能化解决方案。</>,
          <>主导企业内部 AI 平台建设，完成 OpenClaw 部署与推广应用，提升团队整体 AI 使用能力。</>,
          <>设计并落地智能运营助手、办公助手、知识问答助手、选品助手等多个 AI Agent 应用场景。</>,
          <>构建 AI 生图 / 生视频工作流，为电商内容生产提供自动化支撑。</>,
        ],
        images: [],
      },
      {
        company: "杭州澜裳瀚壹电子商务有限公司",
        timeframe: "2025.12 – 2026.04",
        role: "AI Automation Developer（跨境电商 · 高端服饰）",
        achievements: [
          <>
            基于 n8n 搭建 ERP（聚水潭）自动化体系：订单清洗与追踪、进销存管理、商品管理、
            采购单管理与追踪——按需求与销量驱动原料采购与消耗，减少原料堆积、进一步压缩成本。
          </>,
          <>
            打通 Shopify 运营链路：商品一键上架与管理、客户信息管理、客户旅程追踪、
            画像分析与归因分析，让运营决策有数据可依。
          </>,
          <>实现 4PX 物流追踪与管理，及时跟进问题物流；运费管理与追踪，异常场景实时监控与通知。</>,
          <>
            Meta 广告数据分析，并整合加购、销量、广告等多维数据做统计与转化率分析，
            为投放与运营策略提供支撑。
          </>,
          <>搭建 PR 自动化：自动搜寻并追踪博主，跟进博主状态与发帖动态。</>,
          <>金蝶财务数据分析与自动化：实现一键报销、财务金额管理与支配。</>,
          <>
            开发 OpenClaw 企业 AI
            Agent：自动找博主、广告设计、开款头脑风暴，以及多个企业知识库的沉淀。
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "教育经历",
    institutions: [
      {
        name: "浙江金融职业学院",
        description: (
          <>人工智能技术应用专业。主修 Java 开发、软件测试、接口测试、SQL、HTML、鸿蒙开发等课程。</>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "能力地图",
    skills: [
      {
        title: "AI Application",
        description: (
          <>
            AI Agent 设计与编排 · RAG · Tool Calling · MCP · Prompt Engineering，理解 Transformer 与
            AI 运作的底层逻辑。深度使用 ChatGPT、Claude、Gemini、DeepSeek、 Kimi、Qwen、Seed
            系列等模型，在实际业务中深刻理解不同模型的差距与优劣。
          </>
        ),
        tags: [
          { name: "Agent", icon: "rocket" },
          { name: "RAG", icon: "book" },
          { name: "MCP", icon: "grid" },
          { name: "OpenClaw", icon: "rocket" },
        ],
        images: [],
      },
      {
        title: "Automation",
        description: (
          <>
            n8n 工作流设计与运维 · Python 自动化 · AI 生图/生视频工作流 · 跨系统 API
            集成。把重复性人工操作转化为稳定运行的自动化系统。
          </>
        ),
        tags: [
          { name: "n8n", icon: "rocket" },
          { name: "Python", icon: "document" },
        ],
        images: [],
      },
      {
        title: "Full-Stack & Infrastructure",
        description: (
          <>
            前端 / 后端 / 数据库（PostgreSQL）全栈开发 · Docker 容器化 · Linux / 阿里云 ECS
            服务器运维 · 本地 LLM 部署（Ollama）· 网络与计算机硬件。从开发到部署的全链路自持。
          </>
        ),
        tags: [
          { name: "Docker", icon: "grid" },
          { name: "Linux", icon: "globe" },
          { name: "PostgreSQL", icon: "grid" },
          { name: "Ollama", icon: "rocket" },
        ],
        images: [],
      },
      {
        title: "Business",
        description: (
          <>
            跨境电商业务全流程 · Shopify · 聚水潭 ERP · 金蝶财务 · 4PX 物流 · Meta 广告。理解业务是
            AI 落地的前提——技术方案始终服务于业务价值。
          </>
        ),
        tags: [
          { name: "Shopify", icon: "globe" },
          { name: "ERP", icon: "grid" },
          { name: "Meta Ads", icon: "grid" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "学习笔记与思考",
  description: `${person.name} 的个人学习笔记`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `项目与实践记录`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
