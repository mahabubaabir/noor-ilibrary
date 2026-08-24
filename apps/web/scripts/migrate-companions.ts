import { getCliClient } from "sanity/cli"
import { COMPANIONS_COLLECTION } from "../lib/companions-data"

// This script is meant to be run via Sanity CLI:
// npx sanity exec ./scripts/migrate-companions.ts --with-user-token

const client = getCliClient()

async function migrate() {
  console.log("Starting migration to Sanity...")

  for (const companion of COMPANIONS_COLLECTION) {
    console.log(`Migrating ${companion.nameEn}...`)
    
    // We map the local fields to the Sanity schema fields
    const doc = {
      _type: "companion",
      _id: `companion-${companion.slug}`,
      id: companion.id,
      slug: { _type: "slug", current: companion.slug },
      nameBn: companion.nameBn,
      nameEn: companion.nameEn,
      arabicName: companion.arabicName,
      titleBn: companion.titleBn,
      titleEn: companion.titleEn,
      category: companion.category,
      categoryLabelBn: companion.categoryLabelBn,
      categoryLabelEn: companion.categoryLabelEn,
      era: companion.era,
      readTime: companion.readTime,
      avatarIcon: companion.avatarIcon,
      shortBioBn: companion.shortBioBn,
      shortBioEn: companion.shortBioEn,
      keyAttributesBn: companion.keyAttributesBn,
      keyAttributesEn: companion.keyAttributesEn,
      lifeLessonsBn: companion.lifeLessonsBn,
      lifeLessonsEn: companion.lifeLessonsEn,
      sectionsBn: companion.sectionsBn,
      sectionsEn: companion.sectionsEn,
    }

    try {
      await client.createOrReplace(doc)
      console.log(`✅ Successfully migrated ${companion.nameEn}`)
    } catch (error) {
      console.error(`❌ Failed to migrate ${companion.nameEn}:`, error.message)
    }
  }

  console.log("🎉 Migration completed successfully!")
}

migrate().catch(console.error)
