import { InputCustomEvent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { FormEvent, useState } from "react";

interface LoginForm {
    userId: string;
    password: string;
}

const Login: React.FC<any> = () => {
    const [formGroup, setFormGroupValue] = useState<LoginForm>();

    const handleFormChange = (event: any) => {
        setFormGroupValue({
            ...formGroup,
            [event.target.name]: event.detail.value
        } as any)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formGroup);
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
                                <IonInput name="userId" value={formGroup?.userId} onIonChange={e => handleFormChange(e)}></IonInput>
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