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
import { useState } from 'react';
const Home: React.FC = () => {
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  return (
    
    <IonPage>
      <IonContent fullscreen>
        <IonList className='base'>
          <IonList className='headbase'>
          <IonLabel>AIVA</IonLabel>
          <br />
          <IonLabel>AI Virtual Assistant</IonLabel>
          </IonList>

          <IonButton onClick={() => setIsPurposeOpen(true)} className='btnpurp' fill="clear">Purpose</IonButton>
          <IonModal isOpen={isPurposeOpen} className='modal1'>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsPurposeOpen(false)}>Close</IonButton>
            </IonButtons>
            <IonContent>
              <p className='purpcontent'>
                <IonLabel className='purp'>PURPOSE</IonLabel><br /><br /><br />
                <IonLabel className='stream'>Streamlining daily tasks and routines</IonLabel><br /><br />
                <IonLabel className='enhance'>Enhancing productivity</IonLabel><br />
                <IonLabel>Providing personalized recommendations</IonLabel><br />
                <IonLabel>Providing financial guidance</IonLabel><br />
                <IonLabel>Improving health and wellness</IonLabel>
              </p>
            </IonContent>
          </IonModal>

          <IonButton onClick={() => setIsFeaturesOpen(true)} className='btnfeat' fill="clear">Features</IonButton>
          <IonModal isOpen={isFeaturesOpen} className='modal2'>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsFeaturesOpen(false)}>Close</IonButton>
            </IonButtons>
            <IonContent>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
              reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
              Eaque, dicta.
              </p>
            </IonContent>
          </IonModal>

          <IonImg src="/public/images/AIVA.png" alt="AI pic" className='aipic'/>
          <IonImg src="/public/images/AIVA2.png" alt="AI pic" className='aipic2'/>
          
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
