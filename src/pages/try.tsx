import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
  
    const handleInputChange = (event: any) => {
      setInputText(event.target.value);
    };

    const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "/chatbot",
        { text: inputText }
      );
      setResponse(response.data.response);
    } catch (error) {
      console.log("Error fetching response:", error);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList className="base">
          {/* ... */}
          <IonItem className="wdyf">
            <IonLabel position="floating">What do you feel?:</IonLabel>
            <IonInput type="text" placeholder="e.g. Headache" value={inputText} onIonChange={handleInputChange}></IonInput>
          </IonItem>
          <div className="btndiv">
            <IonButton className="btnsub" fill="clear" onClick={handleSubmit}>Submit</IonButton>
          </div>
          <div className="label">
            <IonLabel position="floating">
Response:
</IonLabel>
<IonText>{response}</IonText>
</div>
</IonList>
</IonContent>
</IonPage>
);
};

export default Chatbot;
