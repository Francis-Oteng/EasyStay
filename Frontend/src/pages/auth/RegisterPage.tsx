import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, Home, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const customerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const ownerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof customerSchema>;

const steps = ['Choose Role', 'Your Details', 'Review'];

export function RegisterPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<'customer' | 'owner' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<RegisterForm>({
    resolver: zodResolver(role === 'customer' ? customerSchema : ownerSchema),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
  };

  const nextStep = async () => {
    if (step === 0 && role) {
      setStep(1);
      return;
    }
    const fieldsToValidate = step === 1 ? ['fullName', 'email', 'phone'] as const : [];
    const valid = await trigger(fieldsToValidate);
    if (valid) setStep(prev => Math.min(prev + 1, 2));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-secondary to-primary flex items-center justify-center p-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(123,57,252,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(43,35,68,0.3),transparent_50%)]" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Building2 className="w-8 h-8 text-primary-light" />
          <span className="font-heading text-2xl text-white">StayEasy</span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-ui font-semibold transition-all ${
                i <= step ? 'bg-primary-light text-secondary' : 'bg-white/10 text-gray-400'
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 h-0.5 transition-colors ${i < step ? 'bg-primary-light' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-heading text-3xl text-secondary mb-2">Join StayEasy</h2>
                <p className="text-gray-500 font-ui text-sm mb-6">Choose how you want to use the platform</p>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRole('customer')}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      role === 'customer' ? 'border-primary bg-accent' : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <Home className={`w-8 h-8 mb-3 ${role === 'customer' ? 'text-primary' : 'text-gray-400'}`} />
                    <h3 className="font-ui font-semibold text-secondary mb-1">Guest</h3>
                    <p className="text-xs text-gray-500 font-sans">Browse and book amazing properties worldwide</p>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRole('owner')}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      role === 'owner' ? 'border-primary bg-accent' : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <Building2 className={`w-8 h-8 mb-3 ${role === 'owner' ? 'text-primary' : 'text-gray-400'}`} />
                    <h3 className="font-ui font-semibold text-secondary mb-1">Property Owner</h3>
                    <p className="text-xs text-gray-500 font-sans">List and manage your properties for rent</p>
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  disabled={!role}
                  className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-ui font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-heading text-3xl text-secondary mb-2">{role === 'customer' ? 'Your Details' : 'Owner Details'}</h2>
                <p className="text-gray-500 font-ui text-sm mb-6">Fill in your personal information</p>

                <form id="register-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-ui font-medium text-secondary mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        {...register('fullName')}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.fullName ? 'border-error' : 'border-gray-200'}`}
                      />
                    </div>
                    {errors.fullName && <p className="text-error text-xs font-ui mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-ui font-medium text-secondary mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.email ? 'border-error' : 'border-gray-200'}`}
                      />
                    </div>
                    {errors.email && <p className="text-error text-xs font-ui mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-ui font-medium text-secondary mb-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        {...register('phone')}
                        placeholder="+1 (555) 123-4567"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.phone ? 'border-error' : 'border-gray-200'}`}
                      />
                    </div>
                    {errors.phone && <p className="text-error text-xs font-ui mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-ui font-medium text-secondary mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        placeholder="Create a strong password"
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.password ? 'border-error' : 'border-gray-200'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-error text-xs font-ui mt-1">{errors.password.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-ui font-medium text-secondary mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('confirmPassword')}
                        placeholder="Confirm your password"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.confirmPassword ? 'border-error' : 'border-gray-200'}`}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-error text-xs font-ui mt-1">{errors.confirmPassword.message}</p>}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('acceptTerms')}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-ui text-gray-600">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.acceptTerms && <p className="text-error text-xs font-ui">{errors.acceptTerms.message}</p>}

                  <div className="flex gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={prevStep}
                      className="flex-1 border border-gray-200 text-secondary font-ui font-semibold py-3.5 rounded-xl hover:border-primary transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white font-ui font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      Review <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-heading text-3xl text-secondary mb-2">Almost There!</h2>
                <p className="text-gray-500 font-ui text-sm mb-6">Review your information before creating your account</p>

                <div className="bg-accent rounded-xl p-5 mb-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-ui text-secondary">Role:</span>
                    <span className="font-ui text-gray-600 capitalize">{role}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span className="font-ui text-secondary">Account type:</span>
                    <span className="font-ui text-gray-600 capitalize">{role === 'customer' ? 'Guest' : 'Property Owner'}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={prevStep}
                    className="flex-1 border border-gray-200 text-secondary font-ui font-semibold py-3.5 rounded-xl hover:border-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" /> Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    form="register-form"
                    disabled={isLoading}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-ui font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Check className="w-5 h-5" /> Create Account</>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center mt-6 text-sm font-ui text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-primary font-semibold hover:text-primary-dark transition-colors">
              Log in
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}