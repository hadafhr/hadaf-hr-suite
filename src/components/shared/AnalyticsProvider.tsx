import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: number;
  sessionId: string;
}

interface AnalyticsContextType {
  track: (eventName: string, properties?: Record<string, any>) => void;
  page: (pageName: string, properties?: Record<string, any>) => void;
  identify: (userId: string, traits?: Record<string, any>) => void;
  getSessionId: () => string;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

// Generate or get session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('boud_session_id');
  if (!sessionId) {
    sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('boud_session_id', sessionId);
  }
  return sessionId;
};

// Get device and browser info
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const isMobile = /Mobi|Android/i.test(userAgent);
  const isTablet = /Tablet|iPad/i.test(userAgent);
  
  return {
    viewport,
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer
  };
};

// Get tenant/company info
const getTenantInfo = (user: any) => {
  return {
    tenant_id: user?.user_metadata?.tenant_id || null,
    company_id: user?.user_metadata?.company_id || null,
    user_id: user?.id || null,
    user_role: user?.user_metadata?.role || 'anonymous'
  };
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const sessionId = getSessionId();

  // Base properties that are added to every event
  const getBaseProperties = () => {
    const deviceInfo = getDeviceInfo();
    const tenantInfo = getTenantInfo(user);
    
    return {
      ...deviceInfo,
      ...tenantInfo,
      sessionId,
      timestamp: Date.now(),
      route: location.pathname,
      url: window.location.href,
      lang: document.documentElement.lang || 'ar'
    };
  };

  // Track custom events
  const track = useCallback((eventName: string, properties: Record<string, any> = {}) => {
    const event: AnalyticsEvent = {
      event: eventName,
      properties: {
        ...getBaseProperties(),
        ...properties
      },
      timestamp: Date.now(),
      sessionId
    };

    // Send to analytics service (placeholder for now)
    console.log('📊 Analytics Event:', event);

    // Store in localStorage for debugging/development
    if (process.env.NODE_ENV === 'development') {
      const events = JSON.parse(localStorage.getItem('boud_analytics_events') || '[]');
      events.push(event);
      localStorage.setItem('boud_analytics_events', JSON.stringify(events.slice(-100))); // Keep last 100 events
    }

    // Send to actual analytics service here
    // Example: sendToAnalyticsService(event);
  }, [sessionId, location, user]);

  // Track page views
  const page = useCallback((pageName: string, properties: Record<string, any> = {}) => {
    track('page_view', {
      page_name: pageName,
      ...properties
    });
  }, [track]);

  // Identify user
  const identify = useCallback((userId: string, traits: Record<string, any> = {}) => {
    track('user_identify', {
      user_id: userId,
      traits
    });
  }, [track]);

  // Auto-track page views on route changes
  useEffect(() => {
    const pageName = getPageName(location.pathname);
    page(pageName);
  }, [location.pathname, page]);

  // Auto-identify user when logged in
  useEffect(() => {
    if (user?.id) {
      identify(user.id, {
        email: user.email,
        role: user.user_metadata?.role,
        company_id: user.user_metadata?.company_id,
        tenant_id: user.user_metadata?.tenant_id
      });
    }
  }, [user, identify]);

  // Track session start
  useEffect(() => {
    track('session_start');
    
    // Track session end on page unload
    const handleUnload = () => {
      track('session_end');
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [track]);

  return (
    <AnalyticsContext.Provider
      value={{
        track,
        page,
        identify,
        getSessionId: () => sessionId
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

// Helper function to get page name from pathname
const getPageName = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) return 'home';
  
  const pageMap: Record<string, string> = {
    'admin-dashboard': 'admin_dashboard',
    'company-dashboard': 'company_dashboard', 
    'employee-portal': 'employee_portal',
    'subscription-packages': 'pricing',
    'demo-request': 'demo_request',
    'contact': 'contact',
    'careers': 'careers',
    'blog': 'blog',
    'tutorials': 'knowledge_hub',
    'hr-tools': 'hr_tools',
    'employee-management': 'employee_management_feature',
    'employee-self-service': 'self_service_feature'
  };

  const mainSegment = segments[0];
  return pageMap[mainSegment] || mainSegment.replace(/-/g, '_');
};

// Pre-defined event tracking hooks
export const useTrackEvent = () => {
  const { track } = useAnalytics();

  return {
    // Core business events
    trackDemoRequest: (source?: string) => track('demo_request_submitted', { source }),
    trackPricingCalculation: (result: any) => track('calc_pricing_completed', { result }),
    trackEmployeeRequestCreated: (requestType: string) => track('employee_request_created', { request_type: requestType }),
    trackApprovalAction: (action: 'approve' | 'reject', requestType: string) => track('approval_action', { action, request_type: requestType }),
    trackPayrollRun: (status: 'started' | 'completed', employeeCount: number) => track(`payroll_run_${status}`, { employee_count: employeeCount }),
    trackComplianceExport: (type: 'wps' | 'gosi', recordCount: number) => track('compliance_exported', { export_type: type, record_count: recordCount }),
    trackShiftAssigned: (shiftId: string, employeeId: string) => track('shift_assigned', { shift_id: shiftId, employee_id: employeeId }),
    trackMeetingDecision: (meetingId: string, decision: string) => track('meeting_decision_recorded', { meeting_id: meetingId, decision }),
    trackBudgetVersion: (versionId: string, scenario: string) => track('budget_version_created', { version_id: versionId, scenario }),
    trackActualsImport: (recordCount: number, source: string) => track('actuals_imported', { record_count: recordCount, source }),

    // User interaction events
    trackFeatureUsage: (feature: string, action: string) => track('feature_usage', { feature, action }),
    trackSearchQuery: (query: string, results: number) => track('search_performed', { query, result_count: results }),
    trackExport: (exportType: 'pdf' | 'excel', reportType: string) => track('report_exported', { export_type: exportType, report_type: reportType }),
    trackIntegrationUsage: (integration: string, action: string) => track('integration_used', { integration, action }),
    
    // Performance events
    trackPerformance: (metric: string, value: number) => track('performance_metric', { metric, value }),
    trackError: (error: string, context?: any) => track('error_occurred', { error, context })
  };
};