// src/pages/Login.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as { state?: { from?: Location } };
  const redirectTo = (loc.state?.from as any)?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    try {
      await login(email, password);
      nav(redirectTo, { replace: true });
    } catch (e: any) {
      setErr(e.message ?? 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function onGoogle() {
    setErr(null);
    setSubmitting(true);
    try {
      await loginWithGoogle();
      nav(redirectTo, { replace: true });
    } catch (e: any) {
      setErr(e.message ?? 'Google sign-in failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className='auth-shell'>
      <section className='auth-card' role='region' aria-label='Login'>
        <h1 className='auth-card__title'>Welcome back</h1>
        <p className='auth-card__meta'>Log in to continue</p>

        <form onSubmit={onSubmit} className='auth-form' aria-busy={submitting}>
          <label>
            <span>Email</span>
            <input
              type='email'
              required
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type='password'
              required
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {err && (
            <p className='auth-form__error' role='alert'>
              {err}
            </p>
          )}

          <button type='submit' disabled={submitting}>
            Log In
          </button>
          <button type='button' onClick={onGoogle} disabled={submitting}>
            Continue with Google
          </button>
        </form>

        <p className='auth-form__meta'>
          No account? <Link to='/signup'>Create one</Link>
        </p>
      </section>
    </main>
  );
}
