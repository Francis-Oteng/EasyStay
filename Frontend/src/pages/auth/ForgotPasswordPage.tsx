import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send, Building2, CheckCircle } from 'lucide-react';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,57,252,0.2),transparent_60%)]" />
      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Building2 className="w-8 h-8 text-primary-light" />
          <span className="font-heading text-2xl text-white">StayEasy</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h1 className="font-heading text-3xl text-secondary mb-2">Check Your Email</h1>
              <p className="text-gray-500 font-ui text-sm mb-6">
                We've sent a password reset link to <strong className="text-secondary">{email}</strong>
              </p>
              <a
                href="/login"
                className="text-primary font-ui font-semibold hover:text-primary-dark transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </a>
            </motion.div>
          ) : (
            <>
              <h1 className="font-heading text-3xl text-secondary mb-2">Forgot Password?</h1>
              <p className="text-gray-500 font-ui text-sm mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-ui font-medium text-secondary mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-ui font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Send className="w-5 h-5" /> Send Reset Link</>
                  )}
                </motion.button>
              </form>
              <a
                href="/login"
                className="block text-center mt-6 text-sm font-ui text-gray-500 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 inline mr-1" /> Back to Login
              </a>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}