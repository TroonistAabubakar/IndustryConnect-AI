declare global {
  interface Window {
    openai?: {
      toolOutput?: any;
      onToolResponse?: (callback: (data: any) => void) => void;
    };
  }
}

export {};
