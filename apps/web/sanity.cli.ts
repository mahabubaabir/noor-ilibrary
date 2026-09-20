import { defineCliConfig } from "sanity/cli"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "f7yazuq4"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "ace-noor"

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
