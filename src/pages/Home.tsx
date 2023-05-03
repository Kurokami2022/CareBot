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
                <IonLabel className='purp'>PURPOSE</IonLabel><br />
                <p className='functions'>
                <IonLabel >Streamlining daily tasks and routines</IonLabel>
                </p>
                <p className='functions'>
                <IonLabel >Enhancing productivity</IonLabel>
                </p>
                <p className='functions'>
                <IonLabel >Providing personalized recommendations</IonLabel>
                </p>
                <p className='functions'>
                <IonLabel >Providing financial guidance</IonLabel>
                </p>
                <p className='functions'>
                <IonLabel >Improving health and wellness</IonLabel>
                </p>
              </p>
            </IonContent>
          </IonModal>

          <IonButton onClick={() => setIsFeaturesOpen(true)} className='btnfeat' fill="clear">Features</IonButton>
          <IonModal isOpen={isFeaturesOpen} className='modal2'>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsFeaturesOpen(false)}>Close</IonButton>
            </IonButtons>
            <IonContent>
              <p className='featcontent'>
                <IonLabel className='purp'>KEY FEATURES</IonLabel><br /> 
                <p className='functions'>
                <IonLabel >Manage daily schedule and to-do lists, 
                setting reminders and notifications for upcoming 
                events and tasks.</IonLabel>
                </p>
                <p className='functions'>
                <IonLabel >Using AI to analyze a user's spending 
                  habits and provide personalized financial advice 
                  and budgeting suggestions.</IonLabel>
                </p>
                <p className='functions'>
                <IonLabel >Personalized health and fitness recommendations
                   based on physical activity, diet, and sleep patterns, 
                   as well as tracking their progress and offering 
                   motivational tips.</IonLabel>
                </p>
              </p>
            </IonContent>
          </IonModal>

          <IonImg src="/images/AIVA.png" alt="AI pic" className='aipic'/>
          <IonImg src="/images/AIVA2.png" alt="AI pic" className='aipic2'/>
          
          <IonList className='taBase'>
            
          </IonList>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
