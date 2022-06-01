import React from 'react';
import './index.css';
import App from './components/Apps/App';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from "react-router-dom";
import "./bootstrap.min.css";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<RecoilRoot><BrowserRouter><App /></BrowserRouter></RecoilRoot>);