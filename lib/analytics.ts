// Basic analytics stub - replace with real implementation (Google Analytics, Posthog, etc.)
type AnalyticsEvent = 
  | { name: 'view_home' }
  | { name: 'view_about' }
  | { name: 'open_modal'; section: string; id: string }
  | { name: 'click_visit'; id: string }
  | { name: 'click_repo'; id: string }
  | { name: 'scroll_row'; section: string; direction: 'left' | 'right' };

export function trackEvent(event: AnalyticsEvent) {
  // Check if analytics is enabled via environment variable
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') {
    return;
  }

  // Example implementation with Google Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as any).gtag;
    
    switch (event.name) {
      case 'view_home':
      case 'view_about':
        gtag('event', 'page_view', {
          page_title: event.name.replace('view_', ''),
        });
        break;
      
      case 'open_modal':
        gtag('event', 'open_modal', {
          section: event.section,
          item_id: event.id,
        });
        break;
      
      case 'click_visit':
      case 'click_repo':
        gtag('event', event.name, {
          item_id: event.id,
        });
        break;
      
      case 'scroll_row':
        gtag('event', 'scroll_carousel', {
          section: event.section,
          direction: event.direction,
        });
        break;
    }
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event);
  }
}
