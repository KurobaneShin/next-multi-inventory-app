import React from 'react';

import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

import { IMainCardProps } from '@zaut-frontend/types';

const headerSX = (borderTop: boolean) => ({
  '& .MuiCardHeader-action': { mr: 0, mt: borderTop ? 0 : '6px' },
});

const MainCard = React.forwardRef(
  (
    {
      gutterBottom = false,
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      divider = true,
      borderColor,
      ...others
    }: IMainCardProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Card
        ref={ref}
        {...others}
        sx={(theme) => ({
          position: 'relative',
          marginBottom: gutterBottom ? theme.spacing(3) : 0,
          border: border ? '1px solid' : 'none',
          borderColor:
            borderColor ||
            (theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75),
          ':hover': {
            boxShadow: boxShadow
              ? shadow ||
                (theme.palette.mode === 'dark'
                  ? '0 2px 14px 0 rgb(33 150 243 / 10%)'
                  : '0 2px 14px 0 rgb(32 40 45 / 8%)')
              : 'none',
          },
          ...sx,
        })}
      >
        {/* //* card header and action */}
        {!darkTitle && title && <CardHeader sx={headerSX(content)} title={title} action={secondary} />}
        {darkTitle && title && (
          <CardHeader sx={headerSX(content)} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
        )}

        {/* //* content & header divider */}
        {title && divider && <Divider />}

        {/* //* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
