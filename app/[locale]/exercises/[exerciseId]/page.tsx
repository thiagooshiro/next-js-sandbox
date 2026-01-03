'use client';

import { useParams } from 'next/navigation';
import { getExerciseById } from '@/app/data/exercises';
import { Sandbox } from '@/app/components/Sandbox';
import { ExerciseExplanation } from '@/app/components/ExerciseExplanation';
import { ExerciseNavigator } from '@/app/components/ExerciseNavigator';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';

export default function ExercisePage() {
  const params = useParams();
  const exerciseId = params.exerciseId as string;
  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    return (
      <main className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Exercise not found</h1>
          <p className="text-gray-600">The exercise "{exerciseId}" doesn't exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen flex flex-col">
      {/* Top bar with navigation and language switcher */}
      <div className="relative bg-gray-100 border-b border-gray-300 z-20">
        <ExerciseNavigator currentExerciseId={exerciseId} category={exercise.category} />
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Learning Content Sidebar */}
        <div className="w-1/3 border-r border-gray-300 overflow-y-auto bg-gray-50">
          <ExerciseExplanation exercise={exercise} />
        </div>

        {/* Sandbox */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Sandbox exercise={{
            title: exercise.title,
            description: exercise.description,
            template: exercise.template,
          }} />
        </div>
      </div>
    </main>
  );
}

