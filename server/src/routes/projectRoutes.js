import { Router } from 'express'
import { projects } from '../data/projects.js'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: { projects },
  })
})

export default router
