'use client';

import { useTranslations } from 'next-intl';

export function ErrorDisplay({ error }: { error: Error | null }) {
  const t = useTranslations('errors');
  
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <h3 className="text-red-800 font-semibold mb-2">{t('errorInPreview')}</h3>
      <pre className="text-red-600 text-sm whitespace-pre-wrap">
        {error?.message || t('unknownError')}
      </pre>
    </div>
  );
}

