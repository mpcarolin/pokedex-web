import React from 'react';
import ReactDOM from 'react-dom';
import Pokemon from '../Pokemon.js';
import { BrowserRouter as Router } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement("div")
  const RoutedPoke = <Router><Pokemon /></Router>
  ReactDOM.render(RoutedPoke, div);
  ReactDOM.unmountComponentAtNode(div);
});
