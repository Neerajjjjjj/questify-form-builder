
import React, { useState, useRef, useEffect } from 'react';
import { 
  AlignLeft, 
  Check, 
  Trash, 
  GripVertical,
  CopyPlus,
  Type,
  List,
  CheckSquare,
  ChevronDown,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Question, Option, useForm } from '@/context/FormContext';

interface QuestionProps {
  question: Question;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const QuestionCard: React.FC<QuestionProps> = ({ 
  question, 
  index, 
  isSelected,
  onSelect
}) => {
  const { updateQuestion, deleteQuestion } = useForm();
  const [title, setTitle] = useState(question.title);
  const [description, setDescription] = useState(question.description || '');
  const [required, setRequired] = useState(question.required);
  const [options, setOptions] = useState<Option[]>(question.options || []);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  // Update question when local state changes
  useEffect(() => {
    // Only update if something has changed
    if (
      title !== question.title || 
      description !== question.description || 
      required !== question.required ||
      JSON.stringify(options) !== JSON.stringify(question.options)
    ) {
      updateQuestion({
        ...question,
        title,
        description: description || undefined,
        required,
        options: options.length > 0 ? options : undefined
      });
    }
  }, [title, description, required, options]);

  // Auto-adjust height of textarea
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [title]);

  // Handle option changes
  const addOption = () => {
    const newOption: Option = { id: `opt-${Date.now()}`, value: '' };
    setOptions([...options, newOption]);
  };

  const updateOption = (id: string, value: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, value } : opt));
  };

  const removeOption = (id: string) => {
    setOptions(options.filter(opt => opt.id !== id));
  };

  // Type icon mapping
  const TypeIcon = () => {
    switch (question.type) {
      case 'short':
        return <Type size={18} />;
      case 'paragraph':
        return <AlignLeft size={18} />;
      case 'multiple_choice':
        return <List size={18} />;
      case 'checkbox':
        return <CheckSquare size={18} />;
      case 'dropdown':
        return <ChevronDown size={18} />;
      default:
        return <Type size={18} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'question-container group',
        isSelected && 'selected'
      )}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="mt-1 text-form-dark-gray">
          <TypeIcon />
        </div>
        
        <div className="flex-1">
          <textarea
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full resize-none overflow-hidden text-lg font-medium border-b-2 border-transparent focus:border-form-accent-blue bg-transparent focus:outline-none"
            placeholder="Question title"
            rows={1}
          />
          
          {question.type !== 'short' && (
            <textarea
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 text-sm text-form-dark-gray resize-none border-b-2 border-transparent focus:border-form-accent-blue bg-transparent focus:outline-none"
              placeholder="Description (optional)"
              rows={1}
            />
          )}
        </div>
        
        <div className="text-form-dark-gray opacity-0 group-hover:opacity-100 transition-opacity">
          {index + 1}
        </div>
      </div>
      
      {/* Question content based on type */}
      <div className="ml-8 mt-6">
        {(question.type === 'short') && (
          <div className="border-b border-form-card-border py-2 text-form-dark-gray">
            Short answer text
          </div>
        )}
        
        {(question.type === 'paragraph') && (
          <div className="border-b border-form-card-border py-2 pb-12 text-form-dark-gray">
            Long answer text
          </div>
        )}
        
        {(question.type === 'multiple_choice' || question.type === 'checkbox' || question.type === 'dropdown') && (
          <div className="space-y-3">
            {options.map((option, idx) => (
              <div key={option.id} className="flex items-center gap-3">
                {question.type === 'multiple_choice' && (
                  <div className="w-4 h-4 rounded-full border border-form-dark-gray flex-shrink-0"></div>
                )}
                {question.type === 'checkbox' && (
                  <div className="w-4 h-4 border border-form-dark-gray flex-shrink-0"></div>
                )}
                {question.type === 'dropdown' && (
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    {idx + 1}.
                  </div>
                )}
                
                <input
                  type="text"
                  value={option.value}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  className="flex-1 border-b border-form-card-border focus:border-form-accent-blue bg-transparent py-1 focus:outline-none"
                  placeholder={`Option ${idx + 1}`}
                />
                
                <button 
                  onClick={() => removeOption(option.id)}
                  className="text-form-dark-gray hover:text-form-accent-red p-1 rounded-full"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
            
            <button 
              onClick={addOption}
              className="flex items-center gap-2 text-form-accent-blue hover:text-form-hover-blue mt-2"
            >
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                <Plus size={12} />
              </span>
              <span>Add option</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Footer with actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-form-card-border">
        <div className="flex items-center gap-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const questionCopy = { ...question, id: `q-${Date.now()}` };
              // We'll implement the duplicate logic here using context
            }}
            className="text-form-dark-gray hover:text-form-accent-blue p-1 rounded-full"
          >
            <CopyPlus size={18} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              deleteQuestion(question.id);
            }}
            className="text-form-dark-gray hover:text-form-accent-red p-1 rounded-full"
          >
            <Trash size={18} />
          </button>
          
          <div className="text-form-dark-gray cursor-move p-1 rounded-full">
            <GripVertical size={18} />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-form-dark-gray">Required</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setRequired(!required);
            }}
            className={cn(
              "w-10 h-5 rounded-full flex items-center transition-colors",
              required ? "bg-form-accent-blue" : "bg-form-dark-gray bg-opacity-30"
            )}
          >
            <div 
              className={cn(
                "w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform",
                required ? "translate-x-5" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const AddQuestionButton: React.FC<{ onSelectType: (type: Question['type']) => void }> = ({ onSelectType }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const questionTypes = [
    { type: 'short', label: 'Short answer', icon: <Type size={18} /> },
    { type: 'paragraph', label: 'Paragraph', icon: <AlignLeft size={18} /> },
    { type: 'multiple_choice', label: 'Multiple choice', icon: <List size={18} /> },
    { type: 'checkbox', label: 'Checkboxes', icon: <CheckSquare size={18} /> },
    { type: 'dropdown', label: 'Dropdown', icon: <ChevronDown size={18} /> },
  ] as const;
  
  return (
    <div className="relative mt-4">
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-form-card-border rounded-lg py-3 px-4 text-form-dark-gray hover:text-form-accent-blue hover:border-form-accent-blue transition-colors shadow-subtle"
      >
        <Plus size={20} />
        <span>Add question</span>
      </motion.button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-elevation-2 w-64 overflow-hidden z-10"
        >
          <div className="p-1">
            {questionTypes.map((item) => (
              <button
                key={item.type}
                onClick={() => {
                  onSelectType(item.type);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-form-light-gray rounded-md transition-colors"
              >
                <span className="text-form-dark-gray">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
