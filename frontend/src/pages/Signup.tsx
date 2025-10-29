// src/pages/Signup.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    try {
      await signup(email, password);
      nav('/', { replace: true });
    } catch (e: any) {
      setErr(e.message ?? 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className='auth-shell'>
      <section className='auth-card' role='region' aria-label='Sign up'>
        <h1 className='auth-card__title'>Create your account</h1>
        <p className='auth-card__meta'>It’s quick and easy</p>

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
              minLength={6}
              autoComplete='new-password'
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
            Sign Up
          </button>
        </form>

        <p className='auth-form__meta'>
          Already have an account? <Link to='/login'>Log in</Link>
        </p>
      </section>
    </main>
  );
}
