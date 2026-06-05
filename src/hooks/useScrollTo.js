/**
 * useScrollTo — returns a helper that smoothly scrolls to a section by id.
 * Works on the home page; on other pages it navigates home first then scrolls.
 */
import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function useScrollTo() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const scrollTo = useCallback(
    (id) => {
      const doScroll = () =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

      if (isHome) {
        doScroll()
      } else {
        navigate('/')
        // Small delay to let the page mount before scrolling
        setTimeout(doScroll, 150)
      }
    },
    [isHome, navigate]
  )

  return scrollTo
}