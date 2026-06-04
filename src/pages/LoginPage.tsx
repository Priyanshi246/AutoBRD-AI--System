import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get('signup') === 'true';
  const [mode, setMode] = useState<'login' | 'signup'>(isSignup ? 'signup' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await signUp(email, password, name);
        if (signUpError) {
          setError(signUpError);
          return;
        }
        navigate('/dashboard');
      } else {
        const { error: signInError } = await signIn(email, password);
        if (signInError) {
          setError(signInError);
          return;
        }
        navigate('/dashboard');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4 sm:px-6">
      {/* Background effects */}
      <div className="absolute inset-0" style={{ backgroundColor: '#0B0F19' }}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/15 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#4F8CFF]/15 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,140,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,140,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <a href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">
            Auto<GradientText>BRD</GradientText> AI
          </span>
        </a>

        {/* Auth Card */}
        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-gray-400">
              {mode === 'login'
                ? 'Sign in to continue generating BRDs'
                : 'Start transforming conversations into documentation'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-white/5 p-1 mb-8">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-white/5" />
                  <span className="text-sm text-gray-400">Remember me</span>
                </label>
                <button type="button" className="text-sm text-[#8B5CF6] hover:text-[#8B5CF6]/80 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <Button variant="primary" size="lg" className="w-full" glow disabled={isLoading} type="submit">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Terms */}
          {mode === 'signup' && (
            <p className="text-center text-xs text-gray-400 mt-6">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-[#8B5CF6] hover:underline">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-[#8B5CF6] hover:underline">Privacy Policy</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
