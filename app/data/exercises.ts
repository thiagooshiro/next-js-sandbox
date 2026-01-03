export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'fundamentals' | 'challenges' | 'projects';
  template: string;
  explanation?: {
    title: string;
    intro: string;
    exampleTitle: string;
    exampleDescription: string;
    steps: {
      step1: { title: string; description: string };
      step2: { title: string; description: string };
      step3: { title: string; description: string };
    };
    yourTask: string;
    hint: string;
  };
}

export const exercises: Exercise[] = [
  {
    id: 'hello-world',
    title: 'Hello World Component',
    description: 'Create your first React component that displays "Hello, World!"',
    difficulty: 'beginner',
    category: 'fundamentals',
    template: `function HelloWorld() {
  // Write your code here
  return (
    <div>
      {/* Your JSX goes here */}
    </div>
  );
}`,
    explanation: {
      title: 'Your First React Component',
      intro: 'A React component is a JavaScript function that returns JSX to describe what appears on screen.',
      exampleTitle: 'Example Component',
      exampleDescription: 'Here is what a complete component looks like:',
      steps: {
        step1: {
          title: '1. Function Declaration',
          description: 'Start with a function. The name should start with a capital letter.',
        },
        step2: {
          title: '2. Return JSX',
          description: 'Return JSX (looks like HTML) to describe your UI.',
        },
        step3: {
          title: '3. Export (Optional)',
          description: 'In react-live, you don\'t need to export - just define the function.',
        },
      },
      yourTask: 'Your task: Write a component that displays "Hello, World!"',
      hint: '💡 Hint: Use an h1 tag inside a div to display the text.',
    },
  },
  {
    id: 'jsx-basics',
    title: 'JSX Basics',
    description: 'Learn JSX syntax: elements, attributes, and nesting',
    difficulty: 'beginner',
    category: 'fundamentals',
    template: `function JSXBasics() {
  return (
    <div>
      {/* Add a heading with className="title" */}
      {/* Add a paragraph with className="description" */}
      {/* Add an image with src="https://via.placeholder.com/150" and alt="Placeholder" */}
      {/* Add className="image" to the image */}
    </div>
  );
}`,
    explanation: {
      title: 'JSX Basics',
      intro: 'JSX looks like HTML but it\'s actually JavaScript. You can use HTML-like syntax to create React elements.',
      exampleTitle: 'JSX Example',
      exampleDescription: 'Here are common JSX patterns:',
      steps: {
        step1: {
          title: '1. Elements',
          description: 'Use HTML-like tags: <div>, <h1>, <p>, <img>, etc.',
        },
        step2: {
          title: '2. Attributes & Styling',
          description: 'Use className for CSS classes, or style={{}} for inline styles. Use camelCase: fontSize, not font-size.',
        },
        step3: {
          title: '3. Self-closing Tags',
          description: 'Tags like <img /> and <br /> must be self-closing in JSX.',
        },
      },
      yourTask: 'Your task: Create a heading, paragraph, and image using JSX with className attributes',
      hint: '💡 Hint: Add className="title" to heading, className="description" to paragraph, and className="image" to image. Image tags must be self-closing: <img />',
    },
  },
  {
    id: 'using-props',
    title: 'Using Props',
    description: 'Learn how to pass and use props in components',
    difficulty: 'beginner',
    category: 'fundamentals',
    template: `function Greeting(props) {
  // Use props.name to display a personalized greeting
  return (
    <div>
      {/* Display: "Hello, [name]!" */}
    </div>
  );
}

// This will be called with: <Greeting name="Alice" />
function App() {
  return <Greeting name="Alice" />;
}

// For react-live, we need to render App
App`,
    explanation: {
      title: 'Using Props',
      intro: 'Props (short for properties) let you pass data into components, making them reusable.',
      exampleTitle: 'Props Example',
      exampleDescription: 'Here\'s how props work:',
      steps: {
        step1: {
          title: '1. Accept Props',
          description: 'Your function receives props as a parameter: function Component(props)',
        },
        step2: {
          title: '2. Use Props',
          description: 'Access props with dot notation: props.name, props.age',
        },
        step3: {
          title: '3. Pass Props',
          description: 'When using the component, pass data as attributes: <Component name="Alice" />',
        },
      },
      yourTask: 'Your task: Display a greeting using the name from props',
      hint: '💡 Hint: Use props.name inside curly braces: {props.name}',
    },
  },
  {
    id: 'state-basics',
    title: 'State Basics',
    description: 'Learn to use useState to manage component state',
    difficulty: 'beginner',
    category: 'fundamentals',
    template: `function Counter() {
  // Use useState to create a count state starting at 0
  // const [count, setCount] = useState(0);
  
  return (
    <div>
      {/* Display the count */}
      {/* Add a button that increments count when clicked */}
      <button onClick={() => {}}>
        Click me!
      </button>
    </div>
  );
}`,
    explanation: {
      title: 'State Basics',
      intro: 'State lets components remember and update information. Use useState to add state to your component.',
      exampleTitle: 'useState Example',
      exampleDescription: 'Here\'s how to use state:',
      steps: {
        step1: {
          title: '1. Import useState',
          description: 'In react-live, useState is available. Create state: const [value, setValue] = useState(initialValue)',
        },
        step2: {
          title: '2. Read State',
          description: 'Use the state variable directly: {count}',
        },
        step3: {
          title: '3. Update State',
          description: 'Use the setter function: setCount(count + 1) or setCount(prev => prev + 1)',
        },
      },
      yourTask: 'Your task: Create a counter that increments when the button is clicked',
      hint: '💡 Hint: useState(0) returns [count, setCount]. Use setCount in onClick.',
    },
  },
  {
    id: 'conditional-rendering',
    title: 'Conditional Rendering',
    description: 'Learn to show/hide elements based on conditions',
    difficulty: 'beginner',
    category: 'fundamentals',
    template: `function ToggleBox() {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Box
      </button>
      {/* Only show the box when isVisible is true */}
      {/* Use conditional rendering: {isVisible && <div>...</div>} */}
    </div>
  );
}`,
    explanation: {
      title: 'Conditional Rendering',
      intro: 'You can conditionally show or hide elements using JavaScript operators like && and ternary operators.',
      exampleTitle: 'Conditional Patterns',
      exampleDescription: 'Common ways to conditionally render:',
      steps: {
        step1: {
          title: '1. && Operator',
          description: 'Show if true: {condition && <Element />}',
        },
        step2: {
          title: '2. Ternary Operator',
          description: 'Show one or the other: {condition ? <A /> : <B />}',
        },
        step3: {
          title: '3. Early Return',
          description: 'Return null to show nothing: if (!condition) return null;',
        },
      },
      yourTask: 'Your task: Make the box appear/disappear when clicking the button',
      hint: '💡 Hint: Use {isVisible && <div className="box">I am a box!</div>}',
    },
  },
];

// Helper to get exercises by category
export function getExercisesByCategory(category: Exercise['category']): Exercise[] {
  return exercises.filter(ex => ex.category === category);
}

// Helper to get exercise by ID
export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(ex => ex.id === id);
}
