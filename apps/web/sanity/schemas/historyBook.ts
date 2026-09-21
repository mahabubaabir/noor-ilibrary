import { defineType, defineField } from "sanity"

// NOTE: the object type must NOT be named "reference" — that clashes with
// Sanity's built-in reference type and fails schema validation on deploy.
const bookReference = {
  type: "object" as const,
  name: "bookReference",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "href", title: "Internal link (e.g. /quran/12#ayah-111)", type: "string" },
  ],
}

export const historyBookSchema = defineType({
  name: "historyBook",
  title: "History Book",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", validation: (r) => r.required() }),
    defineField({ name: "titleBn", title: "Title (Bangla)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (English)", type: "string" }),
    defineField({ name: "authorBn", title: "Author (Bangla)", type: "string" }),
    defineField({ name: "authorEn", title: "Author (English)", type: "string" }),
    defineField({ name: "eraBn", title: "Era (Bangla)", type: "string" }),
    defineField({ name: "eraEn", title: "Era (English)", type: "string" }),
    defineField({ name: "descriptionBn", title: "Description (Bangla)", type: "text", rows: 3 }),
    defineField({ name: "descriptionEn", title: "Description (English)", type: "text", rows: 3 }),
    defineField({
      name: "chapters",
      title: "Chapters",
      type: "array",
      of: [
        {
          type: "object",
          name: "chapter",
          fields: [
            { name: "id", title: "Chapter ID", type: "string" },
            { name: "titleBn", title: "Title (Bangla)", type: "string" },
            { name: "titleEn", title: "Title (English)", type: "string" },
            { name: "arabic", title: "Arabic excerpt (optional)", type: "text", rows: 3 },
            {
              name: "contentBn",
              title: "Content (Bangla paragraphs)",
              type: "array",
              of: [{ type: "text" }],
            },
            {
              name: "contentEn",
              title: "Content (English paragraphs)",
              type: "array",
              of: [{ type: "text" }],
            },
            {
              name: "references",
              title: "References",
              type: "array",
              of: [bookReference],
            },
          ],
          preview: { select: { title: "titleEn", subtitle: "titleBn" } },
        },
      ],
    }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "titleEn", subtitle: "titleBn" },
  },
})
