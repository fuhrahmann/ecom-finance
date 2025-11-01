import { render, screen } from '@testing-library/react';
import Breadcrumb from '../Breadcrumb';

// Mock ThemeContext
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

describe('Breadcrumb', () => {
  it('renders breadcrumb items', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ];

    render(<Breadcrumb items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('marks last item as current page', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Current Page' },
    ];

    render(<Breadcrumb items={items} />);

    const currentPage = screen.getByText('Current Page');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  it('renders links for items with href', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products' },
    ];

    render(<Breadcrumb items={items} />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
