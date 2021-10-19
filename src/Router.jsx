import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SideBar from './components/SideBar';
import ROUTES from './config/routes';

const ChartPage = lazy(() => import('./pages/chart/ChartPage'));
const LoadCurvePage = lazy(() => import('./pages/load_curve/LoadCurvePage'));
const SandboxPage = lazy(() => import('./pages/sandbox/SandboxPage'));
const ExperimentsPage = lazy(() => import('./pages/experiment/ExperimentsPage'));

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    }>
      <Switch>
        <SideBar>
          <Route exact path={ROUTES.predictionPage} component={ChartPage} />
          <Route exact path={ROUTES.loadCurvePage} component={LoadCurvePage} />
          <Route exact path={ROUTES.sandboxPage} component={SandboxPage} />
          <Route exact path={ROUTES.experimentsPage} component={ExperimentsPage} />
        </SideBar>
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
