import React, {  FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/layout';
import './App.css';
import { DarkTheme } from './ux/theme';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { ThemeProvider } from '@fluentui/react';

export const App: FC = () => {
  initializeIcons();

  return (
    <ThemeProvider applyTo="body" theme={DarkTheme}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </ThemeProvider>
  );
};
