import { render } from '@testing-library/react';
import { Playground } from './Playground';

test('render playground', () => {
  const { queryByText } = render(<Playground />);
  expect(queryByText(/headers/)).toBeInTheDocument();
});
