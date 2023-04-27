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
    IonLabel,
    IonImg,
    IonButtons,
    IonModal
  } from '@ionic/react';
  import './Home.css';
  import { 
    heartOutline, 
    alertCircleOutline, 
    barChartOutline,
    calendarOutline
  } from 'ionicons/icons';
  const Finance: React.FC = () => {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonList className='base'>
            
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Finance;
  