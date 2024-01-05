// TestCaseGenerator.tsx

import React, { useState, useEffect } from 'react';
import { API_KEY } from '../../config';
import OpenAI from "openai";

const openai = new OpenAI({apiKey: API_KEY, dangerouslyAllowBrowser: true });


interface TestCaseGeneratorProps {
  componentToTest: React.ComponentType<any>;
}

const TestCaseGenerator: React.FC<TestCaseGeneratorProps> = ({ componentToTest }) => {
  const [testCases, setTestCases] = useState<any>([]);

//   useEffect(() => {
//     const fetchTestCases = async () => {
//       try {
//         const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${API_KEY}`,
//           },
//           body: JSON.stringify({
//             prompt: `Generate test cases for ${componentToTest}.`,
//             max_tokens: 100,
//           }),
//         });

//         const data = await response.json();
//         const generatedTestCases = data.choices.map((choice: any) => choice.text);
//         setTestCases(generatedTestCases);
//       } catch (error) {
//         console.error('Error fetching test cases:', error);
//       }
//     };

//     fetchTestCases();
//   }, [componentToTest]);
async function generateTestCases(componentToTest: string) {
    try {
        const response = await openai.completions.create({
            model: 'text-davinci-002', // Replace with your desired model
            prompt: `
                Generate React TypeScript test cases for the following component:
            
                \`\`\`
                const ButtonComponent: React.FunctionComponent<ButtonProps> = (props) => {
                    const {
                        text,
                        disabled = false,
                        className,
                        onClick,
                        style,
                        ariaDescribedBy
                    } = props
                
                    return (
                        <>
                                <button
                                    value={text}
                                    disabled={disabled}
                                    className={className}
                                    onClick={onClick}
                                    style={style}
                                    aria-describedby={ariaDescribedBy}
                                />
                            
                        </>
                    )
                }
                \`\`\`
            `,
            max_tokens: 1000,
          });
      
        const generatedTestCases = response?.choices.map((choice: any) => choice.text);
        return generatedTestCases;
    } catch (error) {
      console.error('Error generating test cases:', error);
      throw error;
    }
  }
  
  // Example usage
  

  useEffect(() => {
    async function main(componentToTest: any) {
        try {
          const testCases = await generateTestCases(`${componentToTest}`);
          setTestCases(testCases);
          console.log('Generated test cases:', testCases);
        } catch (error) {
          console.error('Main function error:', error);
        }
      }

    main(componentToTest)
  }, [componentToTest])
  

  return (
    <div>
      <h2>Test Cases</h2>
      <ul>
        {testCases.map((testCase: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
          <li key={index}>{testCase}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestCaseGenerator;
