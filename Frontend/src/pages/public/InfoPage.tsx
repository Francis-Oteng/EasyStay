import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Shield, HelpCircle, FileText, Cookie, BookOpen } from 'lucide-react';

const pageContent: Record<string, { icon: typeof Shield; title: string; sections: { heading: string; content: string }[] }> = {
  '/faq': {
    icon: HelpCircle,
    title: 'Frequently Asked Questions',
    sections: [
      { heading: 'How do I book a property?', content: 'Simply browse our listings, select your desired property, choose your dates, and complete the booking process. You can pay securely through our platform.' },
      { heading: 'Can I cancel my booking?', content: 'Yes, you can cancel your booking based on the cancellation policy of the property. Each property has its own cancellation policy clearly listed on the booking page.' },
      { heading: 'How do I become a host?', content: 'Click on "Become a Host" in the navigation menu, fill in your property details, upload photos, and submit for review. Our team will verify your listing.' },
      { heading: 'Is my payment information secure?', content: 'Absolutely. We use bank-grade encryption and secure payment gateways to protect your financial information.' },
    ],
  },
  '/terms': {
    icon: FileText,
    title: 'Terms of Service',
    sections: [
      { heading: 'Acceptance of Terms', content: 'By accessing and using StayEasy, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.' },
      { heading: 'User Responsibilities', content: 'Users are responsible for providing accurate information, maintaining the confidentiality of their accounts, and complying with all applicable laws.' },
      { heading: 'Booking and Payments', content: 'All bookings are subject to availability and confirmation. Payments are processed securely through our trusted payment partners.' },
      { heading: 'Cancellation and Refunds', content: 'Cancellation policies vary by property. Refunds are processed according to the specific policy chosen at the time of booking.' },
    ],
  },
  '/privacy': {
    icon: Shield,
    title: 'Privacy Policy',
    sections: [
      { heading: 'Information We Collect', content: 'We collect information you provide directly, such as your name, email, and payment details. We also automatically collect usage data to improve our services.' },
      { heading: 'How We Use Your Information', content: 'Your information is used to process bookings, communicate with you, improve our platform, and send relevant recommendations.' },
      { heading: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.' },
      { heading: 'Your Rights', content: 'You have the right to access, update, or delete your personal information. Contact our support team for assistance.' },
    ],
  },
  '/help': {
    icon: BookOpen,
    title: 'Help Center',
    sections: [
      { heading: 'Getting Started', content: 'New to StayEasy? Learn how to create an account, search for properties, and make your first booking.' },
      { heading: 'Account Support', content: 'Having trouble with your account? Reset your password, update your profile, or manage your preferences.' },
      { heading: 'Booking Issues', content: 'If you experience any issues with your booking, our support team is available 24/7 to assist you.' },
      { heading: 'Contact Us', content: 'Reach out to our support team via email at support@stayeasy.com or call us at +233 50 485 5702.' },
    ],
  },
  '/cookies': {
    icon: Cookie,
    title: 'Cookie Policy',
    sections: [
      { heading: 'What Are Cookies', content: 'Cookies are small text files stored on your device that help us improve your browsing experience and provide personalized content.' },
      { heading: 'How We Use Cookies', content: 'We use cookies for authentication, security, analytics, and to remember your preferences. Some cookies are essential for the platform to function.' },
      { heading: 'Managing Cookies', content: 'You can control and manage cookies in your browser settings. Disabling certain cookies may affect your experience on our platform.' },
      { heading: 'Third-Party Cookies', content: 'We may use third-party services that place cookies for analytics and advertising purposes. These are subject to the respective privacy policies.' },
    ],
  },
};

export function InfoPage() {
  const { pathname } = useLocation();
  const content = pageContent[pathname] || pageContent['/faq'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <content.icon className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-heading text-4xl text-secondary">{content.title}</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {content.sections.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <h2 className="font-ui font-semibold text-lg text-secondary mb-3">{section.heading}</h2>
              <p className="text-gray-600 font-sans leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}