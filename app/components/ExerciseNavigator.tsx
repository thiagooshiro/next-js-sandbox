'use client';

import { useRouter, usePathname } from 'next/navigation';
import { exercises, getExercisesByCategory, type Exercise } from '../data/exercises';

interface ExerciseNavigatorProps {
  currentExerciseId: string;
  category: Exercise['category'];
}

export function ExerciseNavigator({ currentExerciseId, category }: ExerciseNavigatorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const categoryExercises = getExercisesByCategory(category);

  const currentIndex = categoryExercises.findIndex(ex => ex.id === currentExerciseId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < categoryExercises.length - 1;

  const goToExercise = (exerciseId: string) => {
    // Extract locale from pathname (e.g., /en/exercises/hello-world -> en)
    const localeMatch = pathname.match(/^\/([^/]+)/);
    const locale = localeMatch ? localeMatch[1] : 'en';
    router.push(`/${locale}/exercises/${exerciseId}`);
  };

  const goToPrevious = () => {
    if (hasPrevious) {
      goToExercise(categoryExercises[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      goToExercise(categoryExercises[currentIndex + 1].id);
    }
  };

  return (
    <div className="p-4 flex items-center justify-between pr-32">
      <div className="flex items-center gap-3">
        <button
          onClick={goToPrevious}
          disabled={!hasPrevious}
          className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          ← Previous
        </button>
        <button
          onClick={goToNext}
          disabled={!hasNext}
          className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          Next →
        </button>
        <div className="h-6 w-px bg-gray-300 mx-2"></div>
        <span className="text-sm text-gray-600">
          Exercise {currentIndex + 1} of {categoryExercises.length}
        </span>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
          {categoryExercises[currentIndex]?.difficulty}
        </span>
      </div>
    </div>
  );
}

