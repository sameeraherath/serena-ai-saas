import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "@/lib/supabase"

function getQueryError(searchParams: URLSearchParams): string | null {
  const error = searchParams.get("error")
  const description = searchParams.get("error_description")

  if (error) {
    console.error("AuthCallback: OAuth error received", { error, error_description: description })
    return description || error
  }

  return null
}

export default function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const queryError = getQueryError(searchParams)
    if (queryError) {
      const errorParam = encodeURIComponent(queryError === "access_denied" ? "access_denied" : "oauth_failed")
      navigate(`/login?error=${errorParam}`, { replace: true })
      return
    }

    console.log("AuthCallback: checking session")
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("AuthCallback: session found")
        navigate("/chat", { replace: true })
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AuthCallback: auth state change", event)
      if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
        navigate("/chat", { replace: true })
      }
    })

    const timeout = setTimeout(() => {
      console.log("AuthCallback: timeout fired, redirecting with oauth_failed")
      navigate("/login?error=oauth_failed", { replace: true })
    }, 10000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [navigate, searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-sm text-muted-foreground">Signing you in...</span>
      </div>
    </div>
  )
}
