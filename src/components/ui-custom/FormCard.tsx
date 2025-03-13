
import React from 'react';
import { Card } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface FormCardProps {
  id: string;
  title: string;
  lastEdited: string;
  responseCount: number;
  thumbnail?: string;
  className?: string;
}

const FormCard: React.FC<FormCardProps> = ({
  id,
  title,
  lastEdited,
  responseCount,
  thumbnail,
  className,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Link to={`/builder/${id}`} className="block">
        <Card className={cn(
          'overflow-hidden transition-all duration-200 hover:shadow-elevation-2 border border-form-card-border',
          className
        )}>
          {/* Card header/thumbnail */}
          <div 
            className="h-36 bg-gradient-to-r from-form-accent-blue to-form-accent-purple flex items-center justify-center p-4 text-white font-medium"
            style={thumbnail ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            {!thumbnail && (
              <div className="text-center">
                <div className="text-lg truncate max-w-[250px]">{title}</div>
              </div>
            )}
          </div>
          
          {/* Card body */}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="truncate pr-2">
                <h3 className="font-medium text-base truncate">{title}</h3>
                <p className="text-sm text-form-dark-gray mt-1">
                  {lastEdited} • {responseCount} {responseCount === 1 ? 'response' : 'responses'}
                </p>
              </div>
              <button className="text-form-dark-gray hover:bg-form-light-gray p-1 rounded-full">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default FormCard;
