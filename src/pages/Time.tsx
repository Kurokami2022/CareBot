import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonToast , 
  IonPage, 
  IonTitle,
  IonDatetime, 
  IonToolbar, 
  IonButton, 
  IonModal, 
  IonInput, 
  IonList, 
  IonItem, 
  IonIcon, 
  IonLabel 
} from '@ionic/react';
import { 
  calendarOutline, 
  alertCircleOutline, 
  checkmarkDoneOutline 
} from 'ionicons/icons';
import axios from 'axios';
import "./Time.css";

interface Todo {
  id: number;
  todo: string;
}

const Time: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [errorToast, setErrorToast] = useState<string | null>(null);


  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>('http://localhost:4100/api/todos');
      setTodos(response.data);
      console.log("response====>", response.data);
    } catch (error) {
      setErrorToast(String(error));
    }
  };

  const addTodo = async () => {
    try {
      if (newTodo.trim() !== '') {
        await axios.post('http://localhost:4100/api/todos', { todo: newTodo });
        fetchTodos();
        setNewTodo('');
        setShowModal(false);
      }
    } catch (error) {
      setErrorToast(String(error));
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4100/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      setErrorToast(String(error));
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList className="base"> 
        <IonButton onClick={() => setShowModal(true)} className='btntodo' fill='clear'>
          <IonIcon slot="start" icon={calendarOutline} />
          Add Todo
        </IonButton>
        <IonList className='todobase'>
          {todos.map((todo) => (
            <IonItem key={todo.id} className='todoitem'>
              <IonIcon slot="start" icon={alertCircleOutline} className='alert'/>
              <IonLabel className='todotext'>{todo.todo}</IonLabel>
              <IonButton slot="end" fill="clear" onClick={() => deleteTodo(todo.id)} class='done'>
                Done <IonIcon slot="start" icon={checkmarkDoneOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonToolbar>
            <IonTitle>Add Todo</IonTitle>
            <IonButton slot="end" onClick={() => setShowModal(false)}>
              Close
            </IonButton>
          </IonToolbar>
          <IonContent>
            <IonInput
              value={newTodo}
              placeholder="Enter todo"
              onIonChange={(e) => setNewTodo(e.detail.value!)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') addTodo();
              }}
            />
            <IonButton expand="full" onClick={addTodo}>
              Add
            </IonButton>
          </IonContent>
        </IonModal>
        <IonItem className='date'>
        <IonDatetime presentation="date" className='calendar'></IonDatetime>
        </IonItem>
        </IonList>
        <IonToast
          isOpen={errorToast !== null}
          onDidDismiss={() => setErrorToast(null)}
          message={errorToast || ''}
          duration={3000}
          position="top"
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Time;
