
import React from 'react';
import FormBuilder from '@/components/ui-custom/FormBuilder';
import { FormProvider } from '@/context/FormContext';

const Builder: React.FC = () => {
  return (
    <FormProvider>
      <FormBuilder />
    </FormProvider>
  );
};

export default Builder;
