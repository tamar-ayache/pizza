import { render, screen } from '@testing-library/react'; // Imports render and screen utilities from testing-library/react
import App from './App'; // Imports the App component to be tested

test('renders learn react link', () => {
  render(<App />); // Renders the App component
  const linkElement = screen.getByText(/learn react/i);  // Finds an element with text 'learn react' (case insensitive)
  expect(linkElement).toBeInTheDocument();  // Expects the linkElement to be in the document
});
