import { CardContentProps, CardHeaderProps, CardProps } from '@mui/material';

export type User = {
  id: string;
  name: string;
  email: string;
};

export interface IMainCardProps {
  gutterBottom?: boolean;
  border?: boolean;
  boxShadow?: boolean;
  children?: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: React.ReactNode | string;
  divider?: boolean;
  borderColor?: string;
}
