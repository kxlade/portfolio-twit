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
