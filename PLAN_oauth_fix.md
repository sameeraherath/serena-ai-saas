# Plan: Fix OAuth Authentication Failure

## Context

The user is redirected to `http://localhost:5173/login?error=oauth_failed` after attempting Google OAuth sign-in. The OAuth flow is failing to establish a session, and the error is not being surfaced to the user. The app uses Supabase Auth with Google OAuth provider.

## Root Cause Analysis (3 layered bugs)

### Bug 1: `AuthCallback.tsx` ignores URL error/code parameters
- The callback page only uses `getSession()` + `onAuthStateChange` + a 10-second timeout
- It does **not** read `error` or `code` query parameters from the URL
- When Supabase redirects back with an error (e.g., `?error=access_denied`), it's ignored for 10 seconds, then the timeout fires and sends a generic `oauth_failed` message
- In PKCE flow, the URL may contain `code=` that needs exchanging — Supabase's SDK should auto-detect this, but the component doesn't handle the case where auto-exchange fails

### Bug 2: `login/page.tsx` doesn't display the error parameter
- The login page at `/login?error=oauth_failed` never reads `useSearchParams()` to check for errors
- The `error` state starts as `""`, so the red error banner never renders
- User sees a clean login form with no indication something went wrong

### Bug 3: `AuthContext.tsx` has no error handling around OAuth calls
- `signInWithGoogle()` has no try/catch — a thrown error is an unhandled promise rejection
- `getSession()` in the useEffect has no `.catch()` — if it rejects, `loading` stays `true` forever

## Plan

### Step 1: Fix `AuthCallback.tsx` — early URL error detection + better logging

- Import `useSearchParams` from `react-router-dom`
- On mount, check `searchParams.get("error")` and `searchParams.get("error_description")`:
  - If error params exist, immediately `console.error()` the details and redirect to `/login?error=<specific_error>` with the actual error description
- Keep the existing `getSession()` + `onAuthStateChange` + timeout flow as the happy path
- Add `console.log` at key steps for debugging (`"AuthCallback: checking session"`, `"AuthCallback: session found"`, `"AuthCallback: timeout fired"`)

### Step 2: Fix `login/page.tsx` — read and display error query param

- Import `useSearchParams` from `react-router-dom`
- On mount, read `searchParams.get("error")` and set it as the initial `error` state
- Map known error codes to user-friendly messages:
  - `oauth_failed` → "Google sign-in failed. Please try again or use email/password."
  - `access_denied` → "Google sign-in was cancelled. You can try again or use email/password."
  - `server_error` → "Authentication server error. Please try again later."
  - Fallback: display the raw error string

### Step 3: Fix `AuthContext.tsx` — add error handling

- Wrap `signInWithGoogle()` body in try/catch; on error, `console.error()` it (the page redirect happens on success anyway, so the catch path means the redirect never started)
- Add `.catch()` to the `getSession()` promise with `console.error()` and a fallback `setLoading(false)` so the app doesn't hang on a loading spinner

### Step 4: Verify Supabase redirect URL configuration

- Check if `http://localhost:5173/auth/callback` is in the Supabase project's allowed redirect URLs
- If not, instruct the user to add it at: Supabase Dashboard → Authentication → URL Configuration → Redirect URLs

## Files to Modify

| File | What changes |
|---|---|
| `src/pages/AuthCallback.tsx` | Add URL param checking, error logging, early redirect on OAuth errors |
| `src/pages/login/page.tsx` | Read `?error=` param, display user-friendly error banner |
| `src/contexts/AuthContext.tsx` | Add try/catch to `signInWithGoogle`, add `.catch()` to `getSession()` |

## Verification

1. Run `npm run dev` and open `http://localhost:5173/login`
2. Click "Continue with Google" — verify the Google consent screen appears
3. After consent, verify you're redirected to `/chat` (not `/login?error=oauth_failed`)
4. To test error handling, temporarily change the redirect URL in `AuthContext.tsx` to an invalid path — verify a descriptive error appears on the login page
5. Check browser console for any auth-related errors
6. Verify email/password login still works as expected
