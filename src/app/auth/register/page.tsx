'use client';

import { useAppSelector } from '@/hooks/useAppSelector';
import { FormProgress } from '@/components/ui/form-progress';
import { BasicInfoForm } from '@/components/pages/registration/basic-info-form';
import { AddressInfoForm } from '@/components/pages/registration/address-info-form';
import { SecurityInfoForm } from '@/components/pages/registration/security-info-form';
import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Register | NextAuth',
//   description: 'Create a new account',
// };

export default function RegisterPage() {
  const currentStep = useAppSelector((state) => state.registration.currentStep);

  const renderStepForm = () => {
    switch (currentStep) {
      case 'basicInfo':
        return <BasicInfoForm />;
      case 'addressInfo':
        return <AddressInfoForm />;
      case 'securityInfo':
        return <SecurityInfoForm />;
      // Additional forms for other steps will be added here
      default:
        return <BasicInfoForm />;
    }
  };

  return (
    <div className="container mx-auto py-10 md:py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground">
            Complete the registration process to access all features
          </p>
        </div>

        <FormProgress />

        <div className="bg-card p-8 rounded-lg shadow-md">
          {renderStepForm()}
        </div>
      </div>
    </div>
  );
}