
import React from 'react';
import { Card } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Form } from '@/context/FormContext';

export interface FormCardProps {
  id?: string;
  title?: string;
  lastEdited?: string;
  responseCount?: number;
  thumbnail?: string;
  className?: string;
  form?: Form;
  onEdit?: () => void;
  onResponses?: () => void;
  onPreview?: () => void;
}

const FormCard: React.FC<FormCardProps> = ({
  id,
  title,
  lastEdited,
  responseCount,
  thumbnail,
  className,
  form,
  onEdit,
  onResponses,
  onPreview,
}) => {
  // Use form properties if form is provided, otherwise use individual props
  const formId = form?.id || id;
  const formTitle = form?.title || title;
  const formLastEdited = form?.updatedAt ? new Date(form.updatedAt).toLocaleDateString() : lastEdited;
  const formResponseCount = form?.responseCount !== undefined ? form.responseCount : responseCount;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
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
              <div className="text-lg truncate max-w-[250px]">{formTitle}</div>
            </div>
          )}
        </div>
        
        {/* Card body */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div className="truncate pr-2">
              <h3 className="font-medium text-base truncate">{formTitle}</h3>
              <p className="text-sm text-form-dark-gray mt-1">
                {formLastEdited} • {formResponseCount} {formResponseCount === 1 ? 'response' : 'responses'}
              </p>
            </div>
            <div className="flex space-x-2">
              {onEdit && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit();
                  }}
                  className="text-form-dark-gray hover:bg-form-light-gray p-1 rounded-full"
                >
                  <MoreHorizontal size={18} />
                </button>
              )}
            </div>
          </div>
          
          {/* Action buttons if callbacks are provided */}
          {(onEdit || onResponses || onPreview) && (
            <div className="flex mt-3 space-x-2 justify-end">
              {onPreview && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onPreview();
                  }}
                  className="text-xs px-2 py-1 text-form-dark-gray hover:bg-form-light-gray rounded"
                >
                  Preview
                </button>
              )}
              {onResponses && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onResponses();
                  }}
                  className="text-xs px-2 py-1 text-form-dark-gray hover:bg-form-light-gray rounded"
                >
                  Responses
                </button>
              )}
              {onEdit && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit();
                  }}
                  className="text-xs px-2 py-1 text-form-dark-gray hover:bg-form-light-gray rounded"
                >
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default FormCard;
