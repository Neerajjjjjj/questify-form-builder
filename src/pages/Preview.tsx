
import React from 'react';
import FormPreview from '@/components/ui-custom/FormPreview';
import { FormProvider } from '@/context/FormContext';

const Preview: React.FC = () => {
  return (
    <FormProvider>
      <FormPreview />
    </FormProvider>
  );
};

export default Preview;
