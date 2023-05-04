import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { InputChangeEventDetail } from "@ionic/core";
import "swiper/swiper-bundle.css";
import "./Health.css";
import axios from "axios";
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
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonInput,
} from "@ionic/react";
import React from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
}

function Chatbot() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    setInputText(event.detail.value!);
  };

  const chatbotEndpoint = 'http://localhost:5000/chatbot';

  const sendMessage = async (message: string) => {
    const response = await axios.post(chatbotEndpoint, { message });
    return response.data.response;
  };

  const handleSubmit = async () => {
    try {
      if (inputText) {
        const res = await sendMessage(inputText.trim());
        setResponse(res);
      }
    } catch (error) {
      console.log("Error fetching response:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chatbot</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className="base">
          <IonItem className="wdyf">
            <IonLabel position="floating">What do you feel?:</IonLabel>
            <IonInput type="text" value={inputText} onIonChange={handleInputChange} />
          </IonItem>
          <IonButton onClick={handleSubmit}>Submit</IonButton>
          <IonText>{response}</IonText>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Chatbot;
