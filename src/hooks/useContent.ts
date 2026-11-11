import { useState, useEffect } from 'react';

interface ContentBlock {
  id: number;
  key: string;
  value: string;
  type: 'text' | 'textarea' | 'image';
}

interface ContentMap {
  [key: string]: string;
}

// One shared request for all components (was fetched once per component).
let contentCache: ContentMap | null = null;
let contentPromise: Promise<ContentMap> | null = null;

const loadContent = (): Promise<ContentMap> => {
  if (!contentPromise) {
    contentPromise = fetch('/api/content')
      .then((response) => (response.ok ? response.json() : []))
      .then((data: ContentBlock[]) => {
        const map: ContentMap = {};
        data.forEach((block) => {
          map[block.key] = block.value;
        });
        contentCache = map;
        return map;
      })
      .catch((error) => {
        console.error('Failed to load content:', error);
        contentPromise = null; // allow retry on next mount
        return {};
      });
  }
  return contentPromise;
};

/** Drop the cache after admin edits so the next mount refetches. */
export const invalidateContentCache = () => {
  contentCache = null;
  contentPromise = null;
};

export const useContent = () => {
  const [content, setContent] = useState<ContentMap>(() => contentCache ?? {});
  const [loading, setLoading] = useState(contentCache === null);

  useEffect(() => {
    if (contentCache) return;
    let alive = true;
    loadContent().then((map) => {
      if (!alive) return;
      setContent(map);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  const get = (key: string, fallback: string = ''): string => {
    return content[key] || fallback;
  };

  return { content, loading, get };
};
