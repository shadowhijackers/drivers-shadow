import {
  InputCustomEvent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { FormEvent, useState } from "react";
import { API_URL } from "../../environment";
import axios from 'axios';
import { useHistory } from "react-router";

interface SignUpForm {
  name: string;
  password: string;
  type: string;
  confirmPassword: string;
}

const SignUp: React.FC<any> = () => {
  const [formGroup, setFormGroupValue] = useState<SignUpForm>();
  const [present] = useIonAlert();
  const [alertPopup] = useIonAlert();
  let history = useHistory();

  const handleFormChange = (event: any) => {
    setFormGroupValue({
      ...formGroup,
      [event.target.name]: event.detail.value,
    } as any);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formGroup);
    if (formGroup?.password != formGroup?.confirmPassword) {
      alert("Please enter valid password!!");
      return;
    }
    axios.post(API_URL + "/signup", formGroup)
      .then((result) => {
        present({
          cssClass: "my-css",
          header: "Alert",
          message: result.data.status,
          buttons: [
            "Cancel",
            // eslint-disable-next-line no-restricted-globals
            { text: "Ok", handler: (d) => history.push('/login') },
          ],
          onDidDismiss: (e) => console.log("did dismiss"),
        });
      })
      .catch((err) => {
        alertPopup({
            message:err?.response?.data?.message,
            buttons: ['Ok']
        })
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SHADOW TRACKER</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Sign Up</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={(e) => handleSubmit(e)}>
              <IonList>
                <IonItem>
                  <IonLabel position="floating">Mobile No</IonLabel>
                  <IonInput
                    name="name"
                    value={formGroup?.name}
                    onIonChange={(e) => handleFormChange(e)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Type</IonLabel>
                  <IonSelect
                    value={formGroup?.type}
                    placeholder="Select One"
                    name="type"
                    onIonChange={(e) => handleFormChange(e)}
                  >
                    <IonSelectOption value="driver">Driver</IonSelectOption>
                    <IonSelectOption value="employee">Employee</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    name="password"
                    value={formGroup?.password}
                    onIonChange={(e) => handleFormChange(e)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Confirm Password</IonLabel>
                  <IonInput
                    name="confirmPassword"
                    value={formGroup?.confirmPassword}
                    onIonChange={(e) => handleFormChange(e)}
                  ></IonInput>
                </IonItem>
                <IonItem lines="none">
                  <IonButton size="default" type="submit">
                    Submit
                  </IonButton>
                </IonItem>
              </IonList>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
