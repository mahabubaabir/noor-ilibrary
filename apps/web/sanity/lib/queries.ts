import { groq } from "next-sanity"

export const companionsQuery = groq`*[_type == "companion"] | order(nameEn asc) {
  _id,
  id,
  "slug": slug.current,
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

export const prophetsQuery = groq`*[_type == "prophet" && published != false] | order(nameEn asc) {
  _id,
  "slug": slug.current,
  nameBn,
  nameEn,
  nameAr,
  titleBn,
  titleEn,
  eraBn,
  eraEn,
  quranMentionsBn,
  quranMentionsEn,
  summaryBn,
  summaryEn,
  lessonsBn,
  lessonsEn,
  references
}`

export const historyBooksQuery = groq`*[_type == "historyBook" && published != false] | order(titleEn asc) {
  _id,
  "slug": slug.current,
  titleBn,
  titleEn,
  authorBn,
  authorEn,
  eraBn,
  eraEn,
  descriptionBn,
  descriptionEn,
  "chapterCount": count(chapters)
}`

export const historyBookBySlugQuery = groq`*[_type == "historyBook" && slug.current == $slug && published != false][0] {
  _id,
  "slug": slug.current,
  titleBn,
  titleEn,
  authorBn,
  authorEn,
  eraBn,
  eraEn,
  descriptionBn,
  descriptionEn,
  chapters[] {
    id,
    titleBn,
    titleEn,
    arabic,
    contentBn,
    contentEn,
    references
  }
}`
