/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, TargetCompanyId } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LandingView } from './components/views/LandingView';
import { DashboardView } from './components/views/DashboardView';
import { RecruitmentBlueprintView } from './components/views/RecruitmentBlueprintView';
import { PracticeWorkspaceView } from './components/views/PracticeWorkspaceView';
import { InterviewRoomView } from './components/views/InterviewRoomView';
import { DiagnosticsView } from './components/views/DiagnosticsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { ResumeReviewView } from './components/views/ResumeReviewView';

export default function App() {
  // Default to dashboard so the user lands straight into the working application,
  // with quick ability to jump to the Landing View or any other screen
  const [activeScreen, setActiveScreen] = useState<ScreenType>('dashboard');
  const [activeCompanyId, setActiveCompanyId] = useState<TargetCompanyId>('google');

  const handleNavigate = (screen: ScreenType, companyId?: TargetCompanyId) => {
    if (companyId) {
      setActiveCompanyId(companyId);
    }
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If landing page is active, show full-screen product experience
  if (activeScreen === 'landing') {
    return (
      <LandingView
        onEnterApp={(screen = 'dashboard', companyId) => {
          if (companyId) setActiveCompanyId(companyId);
          setActiveScreen(screen);
        }}
      />
    );
  }

  return (
    <div className="flex h-screen bg-[#0b1326] text-[#dae2fd] overflow-hidden">
      {/* Persistent Left Navigation Sidebar */}
      <Sidebar
        activeScreen={activeScreen}
        onSelectScreen={(screen) => setActiveScreen(screen)}
        activeCompanyId={activeCompanyId}
        onSelectCompany={(companyId) => setActiveCompanyId(companyId)}
      />

      {/* Main App Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          activeScreen={activeScreen}
          onSelectScreen={(screen) => setActiveScreen(screen)}
          activeCompanyId={activeCompanyId}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {activeScreen === 'dashboard' && (
            <DashboardView
              onNavigate={handleNavigate}
              activeCompanyId={activeCompanyId}
            />
          )}

          {activeScreen === 'blueprint' && (
            <RecruitmentBlueprintView
              onNavigate={handleNavigate}
              activeCompanyId={activeCompanyId}
              onSelectCompany={setActiveCompanyId}
            />
          )}

          {activeScreen === 'workspace' && (
            <PracticeWorkspaceView onNavigate={handleNavigate} />
          )}

          {activeScreen === 'interview' && (
            <InterviewRoomView onNavigate={handleNavigate} />
          )}

          {activeScreen === 'diagnostics' && (
            <DiagnosticsView onNavigate={handleNavigate} />
          )}

          {activeScreen === 'analytics' && (
            <AnalyticsView onNavigate={handleNavigate} />
          )}

          {activeScreen === 'resume' && (
            <ResumeReviewView onNavigate={handleNavigate} />
          )}
        </main>
      </div>
    </div>
  );
}
