export type NavLink = {
  label: string;
  href: string;
};

export type NavLinkWithIcon = NavLink & {
  icon: string;
};

export type SectionSummary = {
  title: string;
  description: string;
  items: string[];
};