import { defineType, defineField } from "sanity"

export const prophetSchema = defineType({
  name: "prophet",
  title: "Prophet / Nobi",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nameEn", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "nameBn", title: "Name (Bangla)", type: "string" }),
    defineField({ name: "nameEn", title: "Name (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "nameAr", title: "Name (Arabic)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleBn", title: "Title (Bangla)", type: "string" }),
    defineField({ name: "titleEn", title: "Title (English)", type: "string" }),
    defineField({ name: "eraBn", title: "Era (Bangla)", type: "string" }),
    defineField({ name: "eraEn", title: "Era (English)", type: "string" }),
    defineField({ name: "quranMentionsBn", title: "Quran mentions (Bangla)", type: "string" }),
    defineField({ name: "quranMentionsEn", title: "Quran mentions (English)", type: "string" }),
    defineField({ name: "summaryBn", title: "Summary (Bangla)", type: "text", rows: 4 }),
    defineField({ name: "summaryEn", title: "Summary (English)", type: "text", rows: 4 }),
    defineField({
      name: "lessonsBn",
      title: "Lessons (Bangla)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lessonsEn",
      title: "Lessons (English)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "references",
      title: "Quran references",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label (e.g. Surah Yusuf 12:111)", type: "string" },
            { name: "surah", title: "Surah number", type: "number" },
            { name: "ayah", title: "Ayah number", type: "number" },
          ],
        },
      ],
    }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "nameEn", subtitle: "titleEn" },
  },
})
