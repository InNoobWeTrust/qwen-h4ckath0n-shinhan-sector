import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  appDirectory: ".",
  future: {
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;