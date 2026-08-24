import { defineField, defineType } from "sanity"

export const storySchema = defineType({
  name: "story",
  title: "Story/Prophet",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Prophets", value: "prophets" },
          { title: "Miracles", value: "miracles" },
          { title: "Quranic Stories", value: "quranic" },
        ],
      },
    }),
    defineField({
      name: "shortDescriptionBn",
      title: "Short Description (Bengali)",
      type: "text",
    }),
    defineField({
      name: "shortDescriptionEn",
      title: "Short Description (English)",
      type: "text",
    }),
    defineField({
      name: "contentBn",
      title: "Full Content (Bengali)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "contentEn",
      title: "Full Content (English)",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "nameEn",
      subtitle: "category",
    },
  },
})
