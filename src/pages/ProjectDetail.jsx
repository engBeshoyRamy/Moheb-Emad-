import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PROJECTS } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const exists = PROJECTS.some((p) => p.slug === slug)
    navigate(exists ? '/' : '/', { replace: true })
  }, [slug, navigate])

  return null
}