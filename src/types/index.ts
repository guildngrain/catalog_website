export interface BaseComponentProps {
  className?: string;
}

export interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}
