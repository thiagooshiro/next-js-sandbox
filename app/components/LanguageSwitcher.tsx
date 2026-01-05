'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // Get the pathname without the locale prefix
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // Navigate to the new locale with the same path
    
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
    router.refresh();
  };

  return (
    <div className="flex gap-2 bg-white border border-gray-300 rounded-lg p-1 shadow-sm">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            locale === loc
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

