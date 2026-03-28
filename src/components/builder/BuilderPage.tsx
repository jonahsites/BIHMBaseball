import React, { useEffect, useState } from 'react';
import { BuilderComponent, builder } from '@builder.io/react';

// Replace with your Builder.io Public API Key
const BUILDER_API_KEY = process.env.VITE_BUILDER_API_KEY || 'YOUR_BUILDER_PUBLIC_API_KEY';
builder.init(BUILDER_API_KEY);

interface BuilderPageProps {
  model: string;
  urlPath?: string;
  fallback?: React.ReactNode;
}

export const BuilderPage = ({ model, urlPath = window.location.pathname, fallback }: BuilderPageProps) => {
  const [content, setContent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get(model, {
          userAttributes: {
            urlPath: urlPath,
          },
        })
        .toPromise();

      if (content) {
        setContent(content);
      } else {
        setNotFound(true);
      }
    }
    fetchContent();
  }, [model, urlPath]);

  if (notFound && fallback) {
    return <>{fallback}</>;
  }

  return (
    <BuilderComponent model={model} content={content} />
  );
};
