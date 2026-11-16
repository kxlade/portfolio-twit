import { attachProjectImage, getFallbackProjects } from './projectService'

/**
 * Loads projects from the Express API.
 * Static hosting and a stopped local server both fall back to the bundled list
 * so the feed still renders.
 */
export async function fetchProjects() {
  try {
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
    console.warn(`[projectApi] API unavailable (${error.message}). Using local fallback projects.`)
    const fallback = getFallbackProjects()
    fallback.isFallback = true
    fallback.source = 'fallback'
    fallback.error = error.message
    return fallback
  }
}
