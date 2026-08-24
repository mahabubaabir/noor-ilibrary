import { type SchemaTypeDefinition } from "sanity"
import { companionSchema } from "./schemas/companion"
import { storySchema } from "./schemas/story"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [companionSchema, storySchema],
}
