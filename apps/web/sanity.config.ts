import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schema } from "./sanity/schema"
import { dataset, projectId, apiVersion } from "./sanity/env"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Noor Islamic Library CMS",
  schema,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
