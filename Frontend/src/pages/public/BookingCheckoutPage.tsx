import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, User, Calendar, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const steps = ['Review stay', 'Enter details', 'Pay and confirm'];

export function BookingCheckoutPage() {
  const [currentStep] = useState(2);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-accent/30">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Booking</p>
          <h1 className="mt-1 font-heading text-3xl font-bold text-secondary">
            Complete your booking
          </h1>
          <p className="mt-2 text-text-muted">
            Step {currentStep} of 3 — review, enter details, and confirm.
          </p>
        </div>

        <div className="mb-8 flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  i + 1 <= currentStep
                    ? 'bg-primary text-white'
                    : 'border-2 border-border text-text-muted'
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm ${i + 1 <= currentStep ? 'font-medium text-text' : 'text-text-muted'}`}
              >
                {step}
              </span>
              {i < steps.length - 1 && <div className="mx-2 h-px w-8 bg-border" />}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-lg font-semibold text-secondary">
                    Payment
                  </p>
                  <p className="text-sm text-text-muted">
                    Confirm guest details and payment method.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-text">Full name</label>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-accent/50 px-4 py-3 text-text">
                    <User className="h-4 w-4 text-text-muted" />
                    Jordan Smith
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text">Email</label>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-accent/50 px-4 py-3 text-text">
                    jordan@example.com
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text">Card details</label>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-accent/50 px-4 py-3 text-text">
                    <CreditCard className="h-4 w-4 text-text-muted" />
                    •••• •••• •••• 4242
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl bg-accent p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <p className="text-sm text-text-muted">
                  Secure payment, flexible cancellation, and instant reservation confirmation.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Stay summary</p>
              <h3 className="mt-1 font-heading text-xl font-semibold text-secondary">
                Premium King Suite
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Calendar className="h-4 w-4" />
                  <span>Jul 18 - Jul 21</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <User className="h-4 w-4" />
                  <span>2 adults</span>
                </div>
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Total</span>
                  <span className="text-2xl font-bold text-secondary">$660</span>
                </div>
              </div>
              <Button variant="primary" size="lg" className="mt-6 w-full">
                Confirm booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
