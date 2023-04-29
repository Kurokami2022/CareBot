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
  IonModal,
  IonInput
} from '@ionic/react';
import './Home.css';
import { 
  heartOutline, 
  alertCircleOutline, 
  barChartOutline,
  calendarOutline
} from 'ionicons/icons';

import { useRef, useState, useEffect } from 'react';
import natural from 'natural';

const Health: React.FC = () => {



  const feelings = useRef<any>("");
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList className='base'>
          <IonInput placeholder='What do you feel' ref={feelings}></IonInput>
          <IonButton onClick={() => (feelings.current.value)}>Go</IonButton>
          <IonItem>
            <IonLabel>{}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Health;
