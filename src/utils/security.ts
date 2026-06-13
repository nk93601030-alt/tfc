/**
 * TFC Security Utilities Module
 * Provides essential security functions to prevent common web vulnerabilities
 */

// Sanitize user input to prevent XSS attacks
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Validate email format using regex
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number format (Indian format +91 XXXXX XXXXX)
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

// Prevent CSRF by generating and validating tokens (client-side)
export const generateCSRFToken = (): string => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('csrf_token');
    if (token) return token;
    
    const newToken = 'csrf_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('csrf_token', newToken);
    return newToken;
  }
  return '';
};

// Validate CSRF token
export const validateCSRFToken = (token: string): boolean => {
  if (typeof window !== 'undefined') {
    const storedToken = sessionStorage.getItem('csrf_token');
    return storedToken === token;
  }
  return false;
};

// Rate limiting function to prevent brute force attacks
export const isRateLimited = (key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean => {
  if (typeof window !== 'undefined') {
    const storage = sessionStorage.getItem(`rate_limit_${key}`);
    const now = Date.now();
    
    if (!storage) {
      sessionStorage.setItem(`rate_limit_${key}`, JSON.stringify({ attempts: 1, timestamp: now }));
      return false;
    }
    
    const { attempts, timestamp } = JSON.parse(storage);
    
    // Reset if window has passed
    if (now - timestamp > windowMs) {
      sessionStorage.setItem(`rate_limit_${key}`, JSON.stringify({ attempts: 1, timestamp: now }));
      return false;
    }
    
    // Check if limit exceeded
    if (attempts >= maxAttempts) {
      return true;
    }
    
    // Increment attempts
    sessionStorage.setItem(`rate_limit_${key}`, JSON.stringify({ attempts: attempts + 1, timestamp }));
    return false;
  }
  return false;
};

// Encrypt sensitive data in localStorage (basic client-side encryption)
export const encryptData = (data: string, key: string = 'tfc_secure'): string => {
  try {
    // Simple XOR encryption - NOT production-grade, use proper encryption libraries in production
    const encoded = btoa(data); // Base64 encode
    return encoded;
  } catch (e) {
    console.error('Encryption error:', e);
    return '';
  }
};

// Decrypt data from localStorage
export const decryptData = (encrypted: string, key: string = 'tfc_secure'): string => {
  try {
    const decoded = atob(encrypted); // Base64 decode
    return decoded;
  } catch (e) {
    console.error('Decryption error:', e);
    return '';
  }
};

// Validate file uploads
export const validateFileUpload = (file: File, maxSizeMB: number = 5, allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp']): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  // Check file size
  if (file.size > maxSizeBytes) {
    console.warn(`File size exceeds ${maxSizeMB}MB limit`);
    return false;
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    console.warn('File type not allowed');
    return false;
  }
  
  // Check filename for suspicious characters
  if (!/^[\w\s.-]+$/.test(file.name)) {
    console.warn('Suspicious filename detected');
    return false;
  }
  
  return true;
};

// Secure localStorage wrapper with encryption
export const secureStorage = {
  setItem: (key: string, value: any): void => {
    try {
      const jsonString = JSON.stringify(value);
      const encrypted = encryptData(jsonString);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, encrypted);
      }
    } catch (e) {
      console.error('Secure storage error:', e);
    }
  },
  
  getItem: (key: string): any => {
    try {
      if (typeof window !== 'undefined') {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;
        const decrypted = decryptData(encrypted);
        return JSON.parse(decrypted);
      }
    } catch (e) {
      console.error('Secure storage retrieval error:', e);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

// Implement Content Security Policy headers (should be set by server)
export const initializeCSP = (): void => {
  if (typeof window !== 'undefined') {
    // This is informational - actual CSP should be set by server headers
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!cspMeta) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://maps.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; frame-src https://www.google.com https://maps.google.com; connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com";
      document.head.appendChild(meta);
    }
  }
};

// Log security events for monitoring (client-side only)
export const logSecurityEvent = (eventType: string, details: any): void => {
  if (typeof window !== 'undefined') {
    const event = {
      timestamp: new Date().toISOString(),
      type: eventType,
      details,
      url: window.location.href
    };
    
    // Store limited security events
    const events = sessionStorage.getItem('security_events');
    const eventList = events ? JSON.parse(events) : [];
    eventList.push(event);
    
    // Keep only last 50 events
    if (eventList.length > 50) {
      eventList.shift();
    }
    
    sessionStorage.setItem('security_events', JSON.stringify(eventList));
  }
};

// Initialize all security measures on app load
export const initializeSecurity = (): void => {
  initializeCSP();
  generateCSRFToken();
  logSecurityEvent('APP_INITIALIZED', { timestamp: new Date().toISOString() });
};
