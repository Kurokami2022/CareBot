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

const Health = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=c93e67046baf4ceba52e448f64afb8c2`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.log("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList className="base">
          <IonItem className="swiper">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{ delay: 2000 }}
              loop={true}
              className="mySwiper"
            >
              {articles.map((article) => (
                <SwiperSlide key={article.url}>
                  <div onClick={() => handleArticleClick(article)}>
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        style={{ width: "360px", height: "200px" }}
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/150"
                        alt="placeholder"
                        style={{ width: "360px", height: "200px" }}
                      />
                    )}
                    <h3 style={{ fontSize: "1.2rem" }}>{article.title}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </IonItem>
          <IonLabel className="hr">
            Health Recommendation
          </IonLabel>
            <br /><br />
            <IonItem className="wdyf">
            <IonLabel position="floating">What do you feel?:</IonLabel>
            <IonInput type="text" placeholder="e.g. Headache"></IonInput>
            </IonItem>
            <div className="btndiv">
            <IonButton className="btnsub" fill="clear">Submit</IonButton>
            </div>
            <div className="label">
              <IonLabel>  
              </IonLabel>
            </div>
        </IonList>          

        <IonModal
          isOpen={selectedArticle !== null}
          onDidDismiss={handleCloseModal}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{selectedArticle?.title}</IonCardTitle>
              <IonCardSubtitle>Article</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {selectedArticle?.urlToImage && (
                <IonImg
                  src={selectedArticle?.urlToImage}
                  alt={selectedArticle?.title}/>
              )}
              <IonText>{selectedArticle?.description}</IonText>
            </IonCardContent>
            <IonCardContent>
              <IonButton onClick={handleCloseModal}>Close</IonButton>
            </IonCardContent>
          </IonCard>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Health;
