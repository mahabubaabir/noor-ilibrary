import { groq } from "next-sanity"

export const companionsQuery = groq`*[_type == "companion"] | order(nameEn asc) {
  _id,
  id,
  slug,
  nameBn,
  nameEn,
  arabicName,
  titleBn,
  titleEn,
  category,
  categoryLabelBn,
  categoryLabelEn,
  era,
  readTime,
  avatarIcon,
  shortBioBn,
  shortBioEn,
  keyAttributesBn,
  keyAttributesEn,
  lifeLessonsBn,
  lifeLessonsEn,
  sectionsBn,
  sectionsEn
}`
