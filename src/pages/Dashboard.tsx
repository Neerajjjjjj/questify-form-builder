
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/ui-custom/PageTransition';
import FormCard from '@/components/ui-custom/FormCard';
import NewFormButton from '@/components/ui-custom/NewFormButton';
import { useForm } from '@/context/FormContext';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useForm();
  
  // Format the last edited time
  const formatLastEdited = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };

  return (
    <PageTransition className="min-h-screen bg-form-light-gray">
      <header className="bg-white border-b border-form-card-border">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-medium">Form Builder</h1>
        </div>
      </header>
      
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-1">Recent forms</h2>
          <p className="text-form-dark-gray">Create or edit your forms</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <NewFormButton />
          
          {state.forms.map((form, index) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <FormCard
                id={form.id}
                title={form.title}
                lastEdited={formatLastEdited(form.updatedAt)}
                responseCount={form.responseCount}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </PageTransition>
  );
};

export default Dashboard;
