import { InputCustomEvent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../contexts";
import {API_URL} from "../../environment";

interface LoginForm {
    name: string;
    password: string;
}

const Login: React.FC<any> = () => {
    const [formGroup, setFormGroupValue] = useState<LoginForm>();
    const [present] = useIonAlert();
    const [alertPopup] = useIonAlert();
    const userProvider: any = useContext(UserContext);
    let history = useHistory();

    const handleFormChange = (event: any) => {
        setFormGroupValue({
            ...formGroup,
            [event.target.name]: event.detail.value
        } as any)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(API_URL+"/login", formGroup).then((result) => {
            userProvider.setUser(result.data.user)
            history.push('/home') 
        }).catch((err) => {
            alertPopup({
                message:err?.response?.data?.message,
                buttons: ['Ok']
            })
        });
    }

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
                        <IonCardTitle>Login</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <IonList>
                            <IonItem>
                                <IonLabel position="floating">Mobile No</IonLabel>
                                <IonInput name="name" value={formGroup?.name} onIonChange={e => handleFormChange(e)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Password</IonLabel>
                                <IonInput name="password" value={formGroup?.password} onIonChange={e => handleFormChange(e)}></IonInput>
                            </IonItem>
                            <IonItem lines="none">
                                <IonButton  size="default" type="submit">
                                    Submit
                                </IonButton>
                            </IonItem>
                        </IonList>
                    </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>

        </IonPage>
    )
}

export default Login;
