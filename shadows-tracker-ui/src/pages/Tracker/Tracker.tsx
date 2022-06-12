import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect } from "react";
import AlertService from "../../services/alert.service";
import LocationsService from "../../services/locations.service";
import OSMService from "../../services/osm.service";
import WsSocketService from "../../services/ws-socket.service";

function Tracker(props: any) {

    let self: any = {
        title: "GANG LOCATIONS TRACKER",
        wsStatus: "",
        logsData: "",
        uniqueId: "",
        userId: "",
        gangLocations: {},
        showGangInfo: false,
        osmService: new OSMService(),
        locationService: new LocationsService(),
        wsService: new WsSocketService(),
        alertService: new AlertService()
    }
    useEffect(() => {
        self.setupUser();
        self.initMap();
        self.wsSocketListener();
        // eslint-disable-next-line no-restricted-globals
        self.uniqueId = location.href.split("/")[location.href.split("/").length-2]
    }, []);


    self = Object.assign(self, {
        initMap() {
            self.osmService.initMap();
        },
        writeLogsOnview(gangLocations: any) {
            self.logsData = "";
            self.gangLocations = gangLocations;
        },
        sendLocOnChange() {
            self.locationService.onSuccess = (latlng: any) => {
                self.wsService.send({ userId: self.userId, latlng: latlng })
            }
            // for first call
            self.locationService.getCurrentPosition();

            // for every 10s get the locations whether user changed or not
            self.locationService.watchPosition();
        },
        wsSocketListener() {
            self.wsService.onOpen = (() => {
                self.wsStatus = "CONNECTED";
                self.sendLocOnChange();
            });
            self.wsService.closeHandler = () => {
                self.wsStatus = "DISCONNECTED";
            };
            self.wsService.onReconnect = () => {
                self.wsStatus = "RECONNECTING";
            }
            self.wsService.onMessage = (ev: any) => {
                self.wsStatus = "CONNECTED";
                const gangLocationsStr = ev.data;
                console.log("recived locations", gangLocationsStr);
                const gangLocations = JSON.parse(gangLocationsStr)
                self.osmService.clearMarkers();
                self.osmService.setMarkers(gangLocations);
                self.writeLogsOnview(gangLocations);
            }
            self.wsService.connect();
        },
        setupUser() {
            if (localStorage.getItem("userId")) {
                self.userId = localStorage.getItem("userId") as string;
            } else {
                self.userId = Math.floor(Math.random() * 100000 + new Date().getTime()).toString(16)
                localStorage.setItem("userId", self.userId);
            }
        },
        shareTrackerLink() {
            // eslint-disable-next-line no-restricted-globals
            const URL = `${location.origin}/gangs/${self.uniqueId}/locations`;
            navigator.clipboard.writeText(URL).then(() => {
                self.alertService.show("Copied link");
            }).catch(() => {
                self.alertService.show("Something went wrong! copy URL from browser");
            });
        },
        fitBoundGangInMap() {
            self.showGangInfo = true;
            self.osmService.fitBounds();
        }
    });
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>SHADOW TRACKER</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <section>
                    <div style={{width: "100vw", height: "90vh"}} id="mapId"></div>
                </section>
            </IonContent>
        </IonPage>
    )
};
export default Tracker;