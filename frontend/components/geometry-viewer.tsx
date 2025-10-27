"use client";

// Mock implementation of geometry viewer since we can't use React-Three-Fiber directly yet
const GeometryViewer = ({ filePath }: { filePath: string }) => {
  return (
    <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <div className="text-gray-500 dark:text-gray-400 mb-4">3D Geometry Viewer</div>
        <div className="text-sm text-gray-400 dark:text-gray-500">
          React-Three-Fiber component will render the 3D model here
        </div>
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          File: {filePath || 'No file selected'}
        </div>
      </div>
    </div>
  );
};

export { GeometryViewer };
