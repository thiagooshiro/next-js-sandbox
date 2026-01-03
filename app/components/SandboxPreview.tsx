'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { useTranslations } from 'next-intl';
import { ErrorBoundary } from './ErrorBoundary';

interface SandboxPreviewProps {
  compiledCode: string | null;
  error: string | null;
}

export function SandboxPreview({ compiledCode, error }: SandboxPreviewProps) {
  const t = useTranslations('common');
  const tErrors = useTranslations('errors');
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<Root | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    if (!compiledCode || !containerRef.current) {
      return;
    }

    setRenderError(null);

    // Clean up previous root
    if (rootRef.current) {
      rootRef.current.unmount();
      rootRef.current = null;
    }

    try {
      // Create a module-like environment
      const moduleExports: any = {};
      const module = { exports: moduleExports };
      
      // Wrap the compiled code to capture exports
      const wrappedCode = `
        (function(module, exports) {
          ${compiledCode}
        })(module, module.exports);
      `;

      // Execute the code
      eval(wrappedCode);

      // Get the component from exports
      const Component = moduleExports.default || moduleExports;

      if (!Component) {
        throw new Error(tErrors('noComponentExported'));
      }

      // Create React root and render
      if (!rootRef.current) {
        rootRef.current = createRoot(containerRef.current);
      }

      rootRef.current.render(React.createElement(Component));
    } catch (err: any) {
      setRenderError(err.message);
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
    };
  }, [compiledCode]);

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded h-full overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">⚠️</span>
          <h3 className="text-red-800 font-semibold text-lg">{tErrors('compilationError')}</h3>
        </div>
        <div className="bg-red-100 border border-red-300 rounded p-4">
          <pre className="text-red-700 text-sm whitespace-pre-wrap font-mono">{error}</pre>
        </div>
        <p className="text-red-600 text-sm mt-4">
          💡 Check your code for syntax errors. Make sure you have proper JSX syntax and export your component.
        </p>
      </div>
    );
  }

  if (renderError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded h-full overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">❌</span>
          <h3 className="text-red-800 font-semibold text-lg">{tErrors('runtimeError')}</h3>
        </div>
        <div className="bg-red-100 border border-red-300 rounded p-4">
          <pre className="text-red-700 text-sm whitespace-pre-wrap font-mono">{renderError}</pre>
        </div>
        <p className="text-red-600 text-sm mt-4">
          💡 This error occurred when trying to render your component. Check that your component returns valid JSX.
        </p>
      </div>
    );
  }

  if (!compiledCode) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
        <div className="text-center">
          <div className="text-4xl mb-4">👈</div>
          <p className="text-lg font-medium mb-2">{t('previewPlaceholder')}</p>
          <p className="text-sm text-gray-500">Click "Try Your Code" to see your component render here</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div ref={containerRef} className="h-full p-4 bg-white" />
    </ErrorBoundary>
  );
}

