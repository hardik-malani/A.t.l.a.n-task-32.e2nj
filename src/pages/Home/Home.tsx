import React from 'react';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the SQL Runner App</h1>
      <ThemeToggle />
    </div>
  );
};

export default Home;
