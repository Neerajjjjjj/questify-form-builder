
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';
import Button from './Button';
import { useForm, Question, Form } from '@/context/FormContext';
import { ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const FormPreview: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { getForm, submitResponse } = useForm();
  
  const [form, setForm] = useState<Form | undefined>(undefined);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    if (formId) {
      const currentForm = getForm(formId);
      if (currentForm) {
        setForm(currentForm);
        
        // Initialize answers with empty values
        const initialAnswers: Record<string, string | string[]> = {};
        currentForm.questions.forEach(q => {
          initialAnswers[q.id] = q.type === 'checkbox' ? [] : '';
        });
        
        setAnswers(initialAnswers);
      } else {
        // Form not found
        navigate('/');
      }
    }
  }, [formId]);
  
  const handleInputChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleCheckboxChange = (questionId: string, optionValue: string, checked: boolean) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] as string[] || [];
      if (checked) {
        return { ...prev, [questionId]: [...currentAnswers, optionValue] };
      } else {
        return { ...prev, [questionId]: currentAnswers.filter(v => v !== optionValue) };
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredMissing = form?.questions
      .filter(q => q.required)
      .some(q => {
        const answer = answers[q.id];
        return !answer || (Array.isArray(answer) && answer.length === 0);
      });
    
    if (requiredMissing) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Format answers for submission
    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value
    }));
    
    if (form) {
      submitResponse(form.id, formattedAnswers);
      setSubmitted(true);
      toast.success("Form submitted successfully!");
    }
  };
  
  const resetForm = () => {
    // Reset the form for a new submission
    if (form) {
      const initialAnswers: Record<string, string | string[]> = {};
      form.questions.forEach(q => {
        initialAnswers[q.id] = q.type === 'checkbox' ? [] : '';
      });
      
      setAnswers(initialAnswers);
      setSubmitted(false);
    }
  };
  
  if (!form) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-form-dark-gray">Loading form...</div>
      </div>
    );
  }
  
  if (submitted) {
    return (
      <PageTransition className="min-h-screen bg-form-light-gray">
        <div className="max-w-screen-md mx-auto pt-16 px-4 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg border border-form-card-border shadow-subtle p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-form-accent-green mx-auto flex items-center justify-center text-white mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="text-2xl font-medium mb-2">Form submitted</h2>
            <p className="text-form-dark-gray mb-6">Thank you for your response!</p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={resetForm}>Submit another response</Button>
              <Button variant="secondary" onClick={() => navigate('/')}>
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }
  
  return (
    <PageTransition className="min-h-screen bg-form-light-gray pb-16">
      {/* Top navigation bar */}
      <header className="bg-white border-b border-form-card-border sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/builder/${form.id}`)}
              leftIcon={<ArrowLeft size={18} />}
            />
            
            <div className="flex flex-col">
              <span className="text-lg font-medium">Preview: {form.title}</span>
            </div>
          </div>
          
          <Button onClick={() => navigate(`/builder/${form.id}`)}>
            Back to editing
          </Button>
        </div>
      </header>
      
      {/* Form preview content */}
      <div className="max-w-screen-md mx-auto pt-8 px-4">
        <form onSubmit={handleSubmit}>
          {/* Form header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-t-lg border border-form-card-border shadow-subtle p-6 mb-px"
          >
            <div className="border-l-4 border-form-accent-blue pl-4">
              <h1 className="text-2xl font-medium mb-2">{form.title}</h1>
              {form.description && <p className="text-form-dark-gray">{form.description}</p>}
            </div>
          </motion.div>
          
          {/* Questions */}
          {form.questions.map((question, index) => (
            <QuestionInput
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) => handleInputChange(question.id, value)}
              onCheckboxChange={(value, checked) => handleCheckboxChange(question.id, value, checked)}
              className={index === form.questions.length - 1 ? 'rounded-b-lg mb-6' : 'mb-px'}
            />
          ))}
          
          {/* Submit button */}
          <div className="flex justify-between items-center mt-6">
            <Button
              type="submit"
              rightIcon={<Send size={16} />}
            >
              Submit
            </Button>
            
            <p className="text-sm text-form-dark-gray">
              * Required question
            </p>
          </div>
        </form>
      </div>
    </PageTransition>
  );
};

interface QuestionInputProps {
  question: Question;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  onCheckboxChange: (value: string, checked: boolean) => void;
  className?: string;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  value,
  onChange,
  onCheckboxChange,
  className
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`bg-white border border-form-card-border shadow-subtle p-6 ${className}`}
    >
      <div className="mb-4">
        <div className="flex items-start">
          <h3 className="text-base font-medium">{question.title}</h3>
          {question.required && <span className="text-form-accent-red ml-1">*</span>}
        </div>
        {question.description && (
          <p className="text-sm text-form-dark-gray mt-1">{question.description}</p>
        )}
      </div>
      
      {question.type === 'short' && (
        <input
          type="text"
          value={value as string || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-form-card-border rounded-md focus:border-form-accent-blue"
          placeholder="Your answer"
          required={question.required}
        />
      )}
      
      {question.type === 'paragraph' && (
        <textarea
          value={value as string || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-form-card-border rounded-md focus:border-form-accent-blue resize-y"
          placeholder="Your answer"
          rows={4}
          required={question.required}
        />
      )}
      
      {question.type === 'multiple_choice' && question.options && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label key={option.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.value}
                checked={(value as string) === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-form-accent-blue"
                required={question.required}
              />
              <span>{option.value}</span>
            </label>
          ))}
        </div>
      )}
      
      {question.type === 'checkbox' && question.options && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label key={option.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                value={option.value}
                checked={Array.isArray(value) && value.includes(option.value)}
                onChange={(e) => onCheckboxChange(option.value, e.target.checked)}
                className="w-4 h-4 text-form-accent-blue"
              />
              <span>{option.value}</span>
            </label>
          ))}
        </div>
      )}
      
      {question.type === 'dropdown' && question.options && (
        <select
          value={value as string || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-form-card-border rounded-md focus:border-form-accent-blue bg-white"
          required={question.required}
        >
          <option value="" disabled>Choose an option</option>
          {question.options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      )}
    </motion.div>
  );
};

export default FormPreview;
