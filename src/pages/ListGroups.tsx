import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonNote, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './ListGroups.css';
import { pencil, people, trash } from 'ionicons/icons';
import '../data/types';
import { getGroups, saveGroups } from '../data';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Empty from '../components/Empty';

const ListGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  
  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () =>  {
    const _groups = await getGroups();
    setGroups(_groups);
  }

  useIonViewWillEnter(() => {
    loadGroups();
  });

  const handleRemoveGroup = async (groupId: number) => {
    const _groups = groups.filter(group => group.id !== groupId);
    setGroups(_groups);
    await saveGroups(_groups)
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Liste des Contacts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          { groups.length === 0 && (
            <div className="empty-box"><Empty message="Ajoutez des groupes !" /></div>
          )}

          {/* List of the contacts groups  */}
          { groups.length > 0 && <IonList inset={true}>
            <IonListHeader>
              <IonLabel>Groupes ajoutés</IonLabel>
              <IonButton size='small'>
                <IonLabel>Supprimer tout</IonLabel>
              </IonButton>
            </IonListHeader>

            {groups.map(group => (
              <IonItem  button detail key={group.id}>
                <IonIcon color="primary" slot="start" icon={people} size="large"></IonIcon>
                <IonLabel>{group.name}</IonLabel>
                
                <IonButtons>
                  <Link to={`/groups/${group.id}`}>
                    <IonButton fill='clear' color="secondary" size='default'>
                      <IonIcon icon={pencil}></IonIcon>
                    </IonButton>
                  </Link>
                  
                  <IonButton onClick={() => handleRemoveGroup(group.id)} fill="clear" color="danger" size='default'>
                    <IonIcon icon={trash}></IonIcon>
                  </IonButton>
                </IonButtons>
                <IonNote slot='end'>{group.contacts.length}</IonNote>
              </IonItem>
            ))}
          </IonList>}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default ListGroups;
