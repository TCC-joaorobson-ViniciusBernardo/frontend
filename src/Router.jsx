import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideBar from './components/SideBar';

const ChartPage = lazy(() => import('./pages/chart/ChartPage'));

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <SideBar>
          <Route exact path="/" component={ChartPage} />
        </SideBar>
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
