import { type SchemaTypeDefinition } from "sanity"
import { companionSchema } from "./schemas/companion"
import { storySchema } from "./schemas/story"
import { prophetSchema } from "./schemas/prophet"
import { historyBookSchema } from "./schemas/historyBook"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [prophetSchema, historyBookSchema, companionSchema, storySchema],
}
