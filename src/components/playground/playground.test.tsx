import { render } from '@testing-library/react';
import { Playground } from './Playground';
import { LocaleProvider } from '../../context/local';

test('render playground', () => {
  const { queryByText } = render(
    <LocaleProvider>
      <Playground />
    </LocaleProvider>
  );
  expect(queryByText(/headers/)).toBeInTheDocument();
});
