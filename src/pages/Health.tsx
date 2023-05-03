import React, { useState } from 'react';
import { 
  IonContent,
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton 
} from '@ionic/react';
import compromise from 'compromise';

interface Database {
  [key: string]: string;
}

const database: Database = {
  'headache': 'Solutions include taking over-the-counter pain relievers such as acetaminophen or ibuprofen, resting, drinking plenty of fluids, and avoiding triggers such as certain foods or environmental factors',
  'fever': 'Solutions include drinking plenty of fluids, getting rest, and taking over-the-counter fever-reducing medications such as acetaminophen or ibuprofen.',
  'cold': 'drink plenty of fluids and rest',
  'sore throat': 'gargle with warm salt water and rest',
};

const Health: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [solution, setSolution] = useState('');

  const GetAnswer = () => {
    const inputDoc = compromise(userInput.toLowerCase());
    const inputNouns = inputDoc.nouns().out('array');
    let match = false;

    for (const keyword in database) {
      const keywordDoc = compromise(keyword);
      const keywordNouns = keywordDoc.nouns().out('array');

      if (inputNouns.some((noun: string) => keywordNouns.includes(noun))) {
        setSolution(`Solution: ${database[keyword]}`);
        match = true;
        break;
      }
    }

    if (!match) {
      setSolution("Sorry, I don't know the answer to that question.");
    }
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Health Q&amp;A</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">What is your health-related question?</IonLabel>
          <IonInput value={userInput} onIonChange={e => setUserInput(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton expand="block" onClick={GetAnswer}>Get Solution</IonButton>
        <IonLabel>{solution}</IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default Health;
