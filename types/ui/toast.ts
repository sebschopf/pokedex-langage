import type { ToastProps, ToastActionElement } from '@/components/ui/toast';
import type { ReactNode } from 'react';

export type ToasterToast = ToastProps & {
  id: number;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
};

export type Toast = Omit<ToasterToast, 'id'>;
