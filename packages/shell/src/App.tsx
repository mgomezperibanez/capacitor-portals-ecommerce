import {
  IonApp,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { basketOutline, gridOutline, personOutline } from 'ionicons/icons';
import { DataProvider } from 'provider-lib';
import React from 'react';
import { Redirect, Route } from 'react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import './theme/variables.css';

import { CartPage } from './pages/CartPage';
import { HelpPageShell } from './pages/HelpPageShell';
import { ItemPage } from './pages/ItemPage';
import { ShopPage } from './pages/ShopPage';

import {
  LiveUpdate,
  LiveUpdateError,
  syncAll,
} from '@ionic-enterprise/capacitor-portals';

// @ts-ignore
const AddressPage = React.lazy(() => import('account/AddressPage'));
// @ts-ignore
const UserDetailPage = React.lazy(() => import('account/UserDetailPage'));
// @ts-ignore
const PaymentPage = React.lazy(() => import('checkout/PaymentPage'));

setupIonicReact();

syncAll({
  onAppComplete: (liveUpdate: LiveUpdate) => {
    console.log('syncAll App Complete: ', JSON.stringify(liveUpdate));
  },
  onSyncComplete: () => {
    console.log('syncAll is completed.');
  },
  onError: (error: LiveUpdateError) => {
    console.log('syncAll Error: ', JSON.stringify(error));
  },
});
/**/
/**/
/* syncSome({ appIds: ["6c135b8e"] }, { */
/*   onAppComplete: (liveUpdate: LiveUpdate) => { */
/*     console.log("syncAll App Complete: ", JSON.stringify(liveUpdate)) */
/*   }, */
/*   onSyncComplete: () => { */
/*     console.log("syncAll is completed.") */
/*   }, */
/*   onError: (error: LiveUpdateError) => { */
/*     console.log("syncAll Error: ", JSON.stringify(error)) */
/*   } */
/* }) */
/**/
/* syncOne({ appId: "6c135b8e"}) */
/*   .then((result: LiveUpdate) => console.log("syncOne ", JSON.stringify(result))) */
/*   .catch((error: LiveUpdateError) => console.log("syncOne Error: ", JSON.stringify(error))); */

const App: React.FC = () => {
  return (
    <DataProvider>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/">
                <Redirect to="/shop" />
              </Route>
              <Route exact path="/shop" component={ShopPage} />
              <Route path="/shop/:id" component={ItemPage} />

              {/* If you plan on transitioning into a page that is in outside module
                  you will need to create a Shell Page that contains IonPage and IonContent info */}
              <Route exact path="/help" component={HelpPageShell} />
              <Route exact path="/cart" component={CartPage} />
              <Route
                exact
                path="/user"
                render={() => (
                  <React.Suspense fallback={<IonPage></IonPage>}>
                    <UserDetailPage />
                  </React.Suspense>
                )}
              />
              <Route
                exact
                path="/address"
                render={() => (
                  <React.Suspense fallback={<IonPage></IonPage>}>
                    <AddressPage />
                  </React.Suspense>
                )}
              />
              <Route
                path="/address/:id"
                render={() => (
                  <React.Suspense fallback={<IonPage></IonPage>}>
                    <AddressPage />
                  </React.Suspense>
                )}
              />
              <Route
                exact
                path="/payment"
                render={() => (
                  <React.Suspense fallback={<IonPage></IonPage>}>
                    <PaymentPage />
                  </React.Suspense>
                )}
              />
              <Route
                path="/payment/:id"
                render={() => (
                  <React.Suspense fallback={<IonPage></IonPage>}>
                    <PaymentPage />
                  </React.Suspense>
                )}
              />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="shop" href="/shop">
                <IonIcon icon={gridOutline} />
              </IonTabButton>
              <IonTabButton tab="cart" href="/cart">
                <IonIcon icon={basketOutline} />
              </IonTabButton>
              <IonTabButton tab="user" href="/user">
                <IonIcon icon={personOutline} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </DataProvider>
  );
};

export default App;
