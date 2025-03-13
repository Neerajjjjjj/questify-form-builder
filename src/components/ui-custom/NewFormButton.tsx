
import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NewFormButtonProps {
  onClick?: () => void;
}

const NewFormButton: React.FC<NewFormButtonProps> = ({ onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link to="/builder/new" onClick={handleClick}>
      <motion.div
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="h-full min-h-[228px] border border-dashed border-form-card-border rounded-lg flex flex-col items-center justify-center p-6 hover:border-form-accent-blue transition-colors duration-200 bg-white"
      >
        <div className="w-12 h-12 rounded-full bg-form-accent-blue flex items-center justify-center text-white mb-4">
          <Plus size={24} />
        </div>
        <h3 className="font-medium text-lg text-form-dark-gray">Create new form</h3>
      </motion.div>
    </Link>
  );
};

export default NewFormButton;
