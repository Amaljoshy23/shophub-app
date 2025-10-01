import { Link } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

const Breadcrumbs = ({ items = [] }) => {
  const allItems = [
    { label: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
    ...items
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {allItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
          )}
          
          {item.href && index < allItems.length - 1 ? (
            <Link 
              to={item.href}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          ) : (
            <span className="flex items-center gap-1 text-gray-900 font-medium">
              {item.icon}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
