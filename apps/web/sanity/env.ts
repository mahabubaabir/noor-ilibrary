export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-15'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'ace-noor'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'f7yazuq4'

export const useCdn = process.env.NODE_ENV === 'production'
