import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ChevronDown, Send, MessageSquare } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '34 Independence Avenue, Ridge, Accra' },
  { icon: Phone, label: 'Phone', value: '+233 50 485 5702' },
  { icon: Mail, label: 'Email', value: 'hello@stayeasy.com' },
  { icon: Clock, label: 'Hours', value: 'Mon - Fri, 9:00 AM - 6:00 PM GMT' },
];

const faqs = [
  { q: 'How do I make a booking?', a: 'Simply search for your desired destination, select a property, choose your dates, and complete the booking through our secure checkout process.' },
  { q: 'Can I cancel or modify my booking?', a: 'Yes, cancellation and modification policies vary by property. You can manage your booking from your account dashboard.' },
  { q: 'Is my payment information secure?', a: 'Absolutely. We use bank-grade encryption and PCI-compliant payment processing to protect all transactions.' },
  { q: 'How do I contact the host?', a: 'Once your booking is confirmed, you can message the host directly through our platform.' },
  { q: 'What if I have issues during my stay?', a: 'Our 24/7 support team is always available to help resolve any issues during your stay.' },
  { q: 'How are properties verified?', a: 'Each property goes through a rigorous verification process including quality checks, safety inspections, and photo verification.' },
];

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      <div className="bg-gradient-to-br from-secondary to-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-light font-ui text-sm uppercase tracking-[0.2em] mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-5xl sm:text-6xl text-white mb-6"
          >
            We Would Love to Hear From You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 font-sans text-lg max-w-2xl mx-auto"
          >
            Have a question, feedback, or need assistance? Our team is here to help.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8"
            >
              <h2 className="font-ui font-semibold text-2xl text-secondary mb-6">Send Us a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-ui font-medium text-secondary mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui font-medium text-secondary mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-ui font-medium text-secondary mb-1">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-ui font-medium text-secondary mb-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-ui font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </motion.form>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-accent rounded-2xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-ui uppercase tracking-wider mb-1">{info.label}</p>
                    <p className="text-sm font-ui text-secondary">{info.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <p className="text-primary font-ui text-sm uppercase tracking-[0.2em] mb-2">FAQ</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-secondary">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-ui font-semibold text-secondary pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-gray-600 font-sans text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}