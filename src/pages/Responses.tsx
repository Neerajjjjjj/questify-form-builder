
import React from 'react';
import FormResponses from '@/components/ui-custom/FormResponses';
import { FormProvider } from '@/context/FormContext';

const Responses: React.FC = () => {
  return (
    <FormProvider>
      <FormResponses />
    </FormProvider>
  );
};

export default Responses;
