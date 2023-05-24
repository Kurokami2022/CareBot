import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonModal,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonFab,
  IonFabButton,
  IonFabList,
  IonButtons,
  IonItem
} from '@ionic/react';
import {
  addCircleOutline,
  cash,
  trendingDown,
} from 'ionicons/icons';
import './Finance.css';

const Finance: React.FC = () => {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [finance, setFinance] = useState({
    income: "",
    payments: [],
    category: ""
  });
  const [income, setIncome] = useState("");
  const [payments, setPayments] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.post("http://localhost:4000/api/finance")
      .then((response) => {
        setIncome(response.data.income);
        setPayments(response.data.payments);
        console.log("payments--->",response.data)
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  const handleAddPayment = (e: any) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/finance", { finance })
      .then((response) => {
      })
      .catch((error) => {
        console.log("Error adding payment:", error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Finance</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className="base">
          <div className="income" onClick={() => setShowIncomeModal(true)}>
            <IonLabel>
              Income
              <br />
              <div className="incomeVal">₱ {income}</div>
            </IonLabel>
          </div>
          <div className="payments">
            <div>
              <IonLabel>
                Payments
                <br />
                {payments.map((payment, index) => (
                  <>
                <div key={index} className='payment'>₱ -{payment} {category[index]}</div>
                </>
                ))}
              </IonLabel>
            </div>
          </div>
        </IonList>
        <IonModal isOpen={showIncomeModal} onDidDismiss={() => setShowIncomeModal(false)}>
          {}
        </IonModal>

        <IonModal isOpen={showPaymentModal} onDidDismiss={() => setShowPaymentModal(false)}>
          {}
        </IonModal>

        <IonFab vertical="bottom" horizontal="end" slot="fixed" className='test'>
          {}
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Finance;
