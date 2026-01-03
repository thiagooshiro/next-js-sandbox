'use client';

import { type Exercise } from '../data/exercises';

interface ExerciseExplanationProps {
  exercise: Exercise;
}

export function ExerciseExplanation({ exercise }: ExerciseExplanationProps) {
  const explanation = exercise.explanation;

  if (!explanation) {
    return (
      <div className="p-6 bg-white h-full overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{exercise.title}</h1>
        <p className="text-gray-700">{exercise.description}</p>
      </div>
    );
  }

  // Generate example code based on exercise
  const getExampleCode = () => {
    switch (exercise.id) {
      case 'hello-world':
        return `function HelloWorld() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}`;
      case 'jsx-basics':
        return `function JSXBasics() {
  return (
    <div>
      <h1 className="title">My Title</h1>
      <p className="description">Some paragraph text</p>
      <img 
        src="https://via.placeholder.com/150" 
        alt="Placeholder"
        className="image"
      />
    </div>
  );
}`;
      case 'using-props':
        return `function Greeting(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
    </div>
  );
}

function App() {
  return <Greeting name="Alice" />;
}

App`;
      case 'state-basics':
        return `function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me!
      </button>
    </div>
  );
}`;
      case 'conditional-rendering':
        return `function ToggleBox() {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Box
      </button>
      {isVisible && (
        <div className="box" style={{ padding: '20px', background: '#f0f0f0', marginTop: '10px' }}>
          I am a box!
        </div>
      )}
    </div>
  );
}`;
      default:
        return exercise.template;
    }
  };

  return (
    <div className="p-6 bg-white h-full overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {explanation.title}
      </h1>

      <p className="text-gray-700 mb-6 leading-relaxed text-base">
        {explanation.intro}
      </p>

      {/* Example Component */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          {explanation.exampleTitle}
        </h2>
        <p className="text-blue-700 text-sm mb-3">
          {explanation.exampleDescription}
        </p>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>{getExampleCode()}</code>
        </pre>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-6">
        <div className="p-3 bg-gray-50 rounded border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-1 text-sm">
            {explanation.steps.step1.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {explanation.steps.step1.description}
          </p>
        </div>

        <div className="p-3 bg-gray-50 rounded border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-1 text-sm">
            {explanation.steps.step2.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {explanation.steps.step2.description}
          </p>
        </div>

        <div className="p-3 bg-gray-50 rounded border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-1 text-sm">
            {explanation.steps.step3.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {explanation.steps.step3.description}
          </p>
        </div>
      </div>

      {/* Task */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
        <p className="font-semibold text-yellow-900 mb-2 text-sm">
          📝 {explanation.yourTask}
        </p>
        <p className="text-yellow-800 text-sm">
          {explanation.hint}
        </p>
      </div>
    </div>
  );
}

