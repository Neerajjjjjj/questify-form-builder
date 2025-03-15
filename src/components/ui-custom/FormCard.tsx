
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MoreHorizontal, Trash2, Calendar, Clock3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useForm } from '@/context/FormContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

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
  
  const { deleteForm } = useForm();
  
  const handleDelete = (e) => {
    e.stopPropagation();
    if (formId) {
      deleteForm(formId);
      toast.success("Form deleted successfully");
    }
  };
  
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="text-form-dark-gray hover:bg-form-light-gray p-1 rounded-full"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onEdit && (
                    <DropdownMenuItem onClick={(e) => {
                      e.preventDefault();
                      onEdit();
                    }}>
                      Edit
                    </DropdownMenuItem>
                  )}
                  {onPreview && (
                    <DropdownMenuItem onClick={(e) => {
                      e.preventDefault();
                      onPreview();
                    }}>
                      Preview
                    </DropdownMenuItem>
                  )}
                  {onResponses && (
                    <DropdownMenuItem onClick={(e) => {
                      e.preventDefault();
                      onResponses();
                    }}>
                      Responses
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    className="text-form-accent-red"
                    onClick={handleDelete}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FormCard;
