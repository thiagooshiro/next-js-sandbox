'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { getExercisesByCategory } from '../data/exercises';

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string || 'en';
  const fundamentals = getExercisesByCategory('fundamentals');
  const firstExercise = fundamentals[0];

  // Redirect to first exercise
  useEffect(() => {
    if (firstExercise) {
      router.push(`/${locale}/exercises/${firstExercise.id}`);
    }
  }, [locale, router, firstExercise]);

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading exercises...</p>
      </div>
    </main>
  );
}

