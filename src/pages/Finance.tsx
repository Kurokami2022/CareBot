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
  trash
} from 'ionicons/icons';
import './Finance.css';

const Finance: React.FC = () => {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [finance, setFinance] = useState({
    income: '',
    payments: [] as string[],
    category: []
  });
  
  const [income, setIncome] = useState('');
  const [payments, setPayments] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post('http://localhost:4000/api/finance')
      .then((response) => {
        setIncome(response.data.income);
        setPayments(response.data.payments);
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  };

  const handleAddPayment = (e: any) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/finance', { finance })
      .then((response) => {})
      .catch((error) => {
        console.log('Error adding payment:', error);
      });
  };

  const handleDeletePayment = (index: number) => {
    const updatedPayments = [...payments];
    const deletedPayment = updatedPayments.splice(index, 1)[0];
  
    const updatedCategory = [...category];
    updatedCategory.splice(index, 1);
  
    axios
      .post('http://localhost:4000/api/delete-payment', {
        payment: deletedPayment,
        category: updatedCategory[index]
      })
      .then((response) => {
        const responseData = response.data;
        setPayments(responseData.payments);
        setCategory(responseData.category);
      })
      .catch((error) => {
        console.log('Error deleting payment:', error);
      });
  };
  
  
  
  

  return (
    <IonPage>
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
                &nbsp;&nbsp; <IonLabel><div className='payhead'>Payments</div></IonLabel>
                <br />
                {payments.map((payment, index) => (
                  <div key={index} className='payment'>
                    ₱ -{payment} {category[index]}
                    <IonButton fill='clear' className='btntrash' onClick={() => handleDeletePayment(index)}>x</IonButton>
                  </div>
                ))}
              </IonLabel>
            </div>
          </div>
        </IonList>
        <IonModal isOpen={showIncomeModal} onDidDismiss={() => setShowIncomeModal(false)}>
          {/* Content for the income modal */}
        </IonModal>

        <IonModal isOpen={showPaymentModal} onDidDismiss={() => setShowPaymentModal(false)}>
          {/* Content for the payment modal */}
        </IonModal>

        <IonFab vertical="bottom" horizontal="end" slot="fixed" className='test'>
          {/* Content for the fab */}
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Finance;