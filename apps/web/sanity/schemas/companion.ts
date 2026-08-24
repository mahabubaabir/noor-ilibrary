import { defineField, defineType } from "sanity"

export const companionSchema = defineType({
  name: "companion",
  title: "Companion",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nameEn", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameBn",
      title: "Name (Bengali)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameEn",
      title: "Name (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "arabicName",
      title: "Arabic Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleBn",
      title: "Title/Honorific (Bengali)",
      type: "string",
    }),
    defineField({
      name: "titleEn",
      title: "Title/Honorific (English)",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category ID",
      type: "string",
      options: {
        list: [
          { title: "Prophet", value: "prophet" },
          { title: "Rightly Guided Caliphs", value: "caliphs" },
          { title: "Ashara Mubashsharah", value: "ashara" },
          { title: "Mothers of Believers", value: "mothers" },
          { title: "Prominent Companions", value: "prominent" },
          { title: "Youth Companions", value: "youth" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryLabelBn",
      title: "Category Label (Bengali)",
      type: "string",
    }),
    defineField({
      name: "categoryLabelEn",
      title: "Category Label (English)",
      type: "string",
    }),
    defineField({
      name: "era",
      title: "Era/Lifespan",
      type: "string",
    }),
    defineField({
      name: "readTime",
      title: "Estimated Read Time",
      type: "string",
    }),
    defineField({
      name: "avatarIcon",
      title: "Avatar Icon Name",
      type: "string",
    }),
    defineField({
      name: "shortBioBn",
      title: "Short Biography (Bengali)",
      type: "text",
    }),
    defineField({
      name: "shortBioEn",
      title: "Short Biography (English)",
      type: "text",
    }),
    defineField({
      name: "keyAttributesBn",
      title: "Key Attributes (Bengali)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "keyAttributesEn",
      title: "Key Attributes (English)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lifeLessonsBn",
      title: "Life Lessons (Bengali)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lifeLessonsEn",
      title: "Life Lessons (English)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "sectionsBn",
      title: "Full Biography Sections (Bengali)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            { name: "text", title: "Text", type: "text" },
            { name: "hadithOrQuoteRef", title: "Hadith/Quote Reference", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "sectionsEn",
      title: "Full Biography Sections (English)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            { name: "text", title: "Text", type: "text" },
            { name: "hadithOrQuoteRef", title: "Hadith/Quote Reference", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "nameEn",
      subtitle: "category",
    },
  },
})
