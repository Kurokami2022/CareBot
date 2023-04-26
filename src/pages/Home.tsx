import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem,
  IonButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import './Home.css';
import { 
  heartOutline, 
  alertCircleOutline, 
  barChartOutline,
  calendarOutline
} from 'ionicons/icons';
const Home: React.FC = () => {
  return (
    
    <IonPage>
      <IonContent fullscreen>
        <IonList className='base'>
          <IonList className='headbase'>
          <IonLabel>AIVA</IonLabel>
          <br />
          <IonLabel>AI Virtual Assistant</IonLabel>
          </IonList>
          <IonList className='taBase'>
            <IonButton className='calendar' fill="clear">
              <IonIcon icon={calendarOutline} />
            </IonButton>
            <IonButton className='finance' fill="clear">
              <IonIcon icon={barChartOutline} />
            </IonButton>
            <IonButton className='health' fill="clear">
              <IonIcon icon={heartOutline} />
            </IonButton>
            <IonButton className='about' fill="clear">
              <IonIcon icon={alertCircleOutline} />
            </IonButton>
          </IonList>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
