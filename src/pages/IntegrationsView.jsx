import React from 'react';
import { IntegrationsPlatform } from '../components/integrations/IntegrationsPlatform';
import { MainLayout } from '../components/MainLayout';

export const IntegrationsView = () => {
  return (
    <MainLayout>
      <div className="w-full bg-slate-50 min-h-screen">
        <IntegrationsPlatform />
      </div>
    </MainLayout>
  );
};