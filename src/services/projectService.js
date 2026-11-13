import origamiImage from '../assets/Origami-Screenshot.png'
import collegeImage from '../assets/College-Screenshot.png'
import petAdoptionImage from '../assets/Pet-Adoption-Screenshot.png'
import restaurantImage from '../assets/Resturant.png'
import { fallbackProjects } from '../data/projects'

export const projectImages = {
  'origami-for-all': origamiImage,
  'college-website': collegeImage,
  'pet-adoption-website': petAdoptionImage,
  'e-resturant': restaurantImage,
}

/**
 * Attaches the corresponding imported image asset to a project object.
 */
export function attachProjectImage(project) {
  if (!project) return null
  return {
    ...project,
    image: projectImages[project.id] || null,
  }
}

/**
 * Returns the bundled fallback projects with screenshots mapped.
 */
export function getFallbackProjects() {
  return fallbackProjects.map(attachProjectImage)
}

/**
 * Synchronously retrieves a single fallback project by its slug or id.
 */
export function getFallbackProjectBySlug(slug) {
  const project = fallbackProjects.find((p) => p.slug === slug || p.id === slug)
  return project ? attachProjectImage(project) : null
}

/**
 * Fetches projects from the Express backend API when available.
 * If the API is unreachable (e.g. on Netlify static hosting or when the local
 * server is stopped), it gracefully falls back to the bundled fallback projects.
 */
export async function fetchProjects() {
  try {
    // 3.5s timeout prevents hung network requests when backend is down/unreachable
    const response = await fetch('/api/projects', {
      signal: AbortSignal.timeout(3500),
    })

    if (!response.ok) {
      throw new Error(`Projects request failed (${response.status})`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Projects API returned non-JSON response')
    }

    const payload = await response.json()
    if (payload.status !== 'success' || !Array.isArray(payload.data?.projects)) {
      throw new Error('Projects API returned an unexpected response format')
    }

    const apiProjects = payload.data.projects.map(attachProjectImage)
    apiProjects.isFallback = false
    apiProjects.source = 'api'
    return apiProjects
  } catch (error) {
    // Graceful degradation: fall back to local projects without breaking the feed
    console.warn(`[projectService] API unavailable (${error.message}). Using local fallback projects.`)
    const fallback = getFallbackProjects()
    fallback.isFallback = true
    fallback.source = 'fallback'
    fallback.error = error.message
    return fallback
  }
}
