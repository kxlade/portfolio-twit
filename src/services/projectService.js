import origamiImage from '../assets/Origami-Screenshot.png'
import collegeImage from '../assets/College-Screenshot.png'
import petAdoptionImage from '../assets/Pet-Adoption-Screenshot.png'
import restaurantImage from '../assets/Resturant.png'

const projectImages = {
  'origami-for-all': origamiImage,
  'college-website': collegeImage,
  'pet-adoption-website': petAdoptionImage,
  'e-resturant': restaurantImage,
}

export async function fetchProjects() {
  const response = await fetch('/api/projects')
  if (!response.ok) {
    throw new Error(`Projects request failed (${response.status})`)
  }

  const payload = await response.json()
  if (payload.status !== 'success' || !Array.isArray(payload.data?.projects)) {
    throw new Error('Projects API returned an unexpected response')
  }

  return payload.data.projects.map((project) => ({
    ...project,
    image: projectImages[project.id],
  }))
}
