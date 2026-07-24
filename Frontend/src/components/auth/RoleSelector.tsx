import { motion } from 'framer-motion';
import { User, Building2 } from 'lucide-react';
import clsx from 'clsx';

type UserRole = 'customer' | 'owner';

interface Role {
  value: UserRole;
  title: string;
  description: string;
  icon: typeof User;
}

export interface RoleSelectorProps {
  selected: UserRole | null;
  onSelect: (role: UserRole) => void;
}

const roles: Role[] = [
  {
    value: 'customer',
    title: 'Customer',
    description: 'I want to book properties',
    icon: User,
  },
  {
    value: 'owner',
    title: 'Owner',
    description: 'I want to list properties',
    icon: Building2,
  },
];

export function RoleSelector({ selected, onSelect }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {roles.map((role, index) => {
        const Icon = role.icon;
        const isSelected = selected === role.value;

        return (
          <motion.button
            key={role.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', damping: 25, stiffness: 300 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => onSelect(role.value)}
            className={clsx(
              'relative p-6 rounded-2xl border-2 text-left transition-all duration-200',
              isSelected
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border bg-white hover:border-primary/30 hover:shadow-sm',
            )}
          >
            <div
              className={clsx(
                'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors',
                isSelected ? 'bg-primary text-white' : 'bg-accent text-primary',
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3
              className={clsx(
                'text-lg font-semibold mb-1 transition-colors',
                isSelected ? 'text-primary' : 'text-text',
              )}
            >
              {role.title}
            </h3>
            <p className="text-sm text-text-muted">{role.description}</p>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
              >
                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}