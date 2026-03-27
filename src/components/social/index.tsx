import type { ReactNode } from "react";

interface SocialProps {
  children: ReactNode;
  url: string;
}

export function Social({ children, url }: SocialProps) {
  return (
    <a href={url} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}
