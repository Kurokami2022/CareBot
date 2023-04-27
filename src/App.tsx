import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonTabBar, IonTabButton, IonIcon, IonLabel, IonList} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { 
  heartOutline, 
  alertCircleOutline, 
  barChartOutline,
  calendarOutline
} from 'ionicons/icons';
import './app.css'
import Home from './pages/Home';
import Time from './pages/time';
import Health from './pages/health';
import Finance from './pages/finance';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/time">
          <Time />
        </Route>
        <Route exact path="/finance">
        <Finance />
          </Route>
        <Route exact path="/health">
          <Health />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>

  <IonList className='taBase'>
  <IonTabBar slot="bottom" className='tabbar'>
  <IonTabButton tab="time" href="/time" className='btntime'>
    <IonIcon icon={calendarOutline} className='btntime'/>
  </IonTabButton>

  <IonTabButton tab="finance" href="/finance">
    <IonIcon icon={barChartOutline} className='btnfinance'/>
  </IonTabButton>

  <IonTabButton tab="health" href="/health">
    <IonIcon icon={heartOutline} className='btnhealth'/>
  </IonTabButton>

  <IonTabButton tab="about" href="/home">
    <IonIcon icon={alertCircleOutline} className='btnabout'/>
  </IonTabButton>
</IonTabBar>
</IonList>

  </IonApp>
);

export default App;
