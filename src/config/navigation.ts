export interface NavItem {
  label: string;
  href: string;
}

export interface NavConfig {
  main: NavItem[];
  footer: NavItem[];
}

export const navigation: NavConfig = {
  main: [
    { label: "Home", href: "/" },
  ],
  footer: [
    { label: "Home", href: "/" },
  ],
};
