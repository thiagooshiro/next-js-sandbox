'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading editor...</div>,
});

interface SandboxProps {
  initialCode?: string;
  exercise?: {
    title: string;
    description: string;
    template: string;
  };
}

export function Sandbox({ initialCode = '', exercise }: SandboxProps) {
  const t = useTranslations('common');
  
  // Default template if none provided
  const defaultTemplate = `function HelloWorld() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}`;

  // Helper to check if template is valid code (not a translation key)
  const isValidTemplate = (template: string | undefined): boolean => {
    if (!template) return false;
    if (template.startsWith('exercises.')) return false;
    if (template.length < 20) return false;
    return template.includes('function') || template.includes('export') || template.includes('return');
  };

  // Get the template to use - remove imports and exports for react-live
  const getTemplate = (): string => {
    let template = '';
    if (exercise && isValidTemplate(exercise.template)) {
      template = exercise.template;
    } else if (initialCode && initialCode.trim().length > 10) {
      template = initialCode;
    } else {
      template = defaultTemplate;
    }
    
    // Remove import statements and export default for react-live
    return template
      .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '')
      .replace(/export\s+default\s+/g, '')
      .replace(/export\s+/g, '')
      .trim();
  };
  
  const [code, setCode] = useState(() => getTemplate());
  const [showPreview, setShowPreview] = useState(false);

  // Update template when exercise changes
  useEffect(() => {
    const newTemplate = getTemplate();
    setCode(newTemplate);
    setShowPreview(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise?.template]);

  const handleTryCode = () => {
    if (!code.trim()) {
      return;
    }
    setShowPreview(true);
  };

  return (
    <div className="flex flex-col h-full">
      {exercise && (
        <div className="p-4 bg-blue-50 border-b border-blue-200">
          <h2 className="text-xl font-bold text-blue-900 mb-2">{exercise.title}</h2>
          <p className="text-blue-700 text-sm">{exercise.description}</p>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <div className="w-1/2 border-r border-gray-300 flex flex-col">
          <div className="p-2 bg-gray-100 border-b border-gray-300 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t('editor')}</span>
            <button
              onClick={handleTryCode}
              disabled={!code.trim()}
              className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {t('tryCode')}
            </button>
          </div>
          <div className="flex-1">
            <MonacoEditor
              height="100%"
              language="typescript"
              theme="vs-light"
              value={code}
              onChange={(value) => {
                setCode(value || '');
                setShowPreview(false);
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        {/* Preview Pane */}
        <div className="w-1/2 flex flex-col">
          <div className="p-2 bg-gray-100 border-b border-gray-300">
            <span className="text-sm font-semibold text-gray-700">{t('preview')}</span>
          </div>
          <div className="flex-1 overflow-auto bg-white">
            {showPreview ? (
              <LiveProvider code={code} noInline={false}>
                <div className="p-4">
                  {/* CSS for JSX Basics exercise - applied automatically */}
                  {exercise?.title?.includes('JSX Basics') && (
                    <style>{`
                      .title {
                        color: #2563eb;
                        font-size: 32px;
                        font-weight: bold;
                        margin-bottom: 16px;
                      }
                      .description {
                        color: #6b7280;
                        padding: 10px;
                        font-size: 16px;
                        margin-bottom: 16px;
                        line-height: 1.5;
                      }
                      .image {
                        border: 2px solid #000;
                        border-radius: 8px;
                        display: block;
                        margin-top: 10px;
                      }
                    `}</style>
                  )}
                  <LivePreview />
                  <LiveError className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-700" />
                </div>
              </LiveProvider>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">👈</div>
                  <p className="text-lg font-medium mb-2">{t('previewPlaceholder')}</p>
                  <p className="text-sm text-gray-500">Click "{t('tryCode')}" to see your component render here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
