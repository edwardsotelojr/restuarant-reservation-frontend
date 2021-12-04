import React from "react";
import { render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react';
import App from './App';
import Signup from './components/Signup';
import DateSelection from './components/DateSelection';
import Header from './components/Header';
import TimeSelection from './components/TimeSelection';

import '@testing-library/jest-dom';
import HomePage from "./components/HomePage";
import ReactDOM from "react-dom";

it ("renders w/o creashing", () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div);
  ReactDOM.render(<Signup />, div);
  ReactDOM.render(<HomePage />, div);
  ReactDOM.render(<DateSelection />, div);
  ReactDOM.render(<Header />, div);
  ReactDOM.render(<TimeSelection />, div);
})
