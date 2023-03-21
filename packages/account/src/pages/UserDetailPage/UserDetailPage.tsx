import { Camera, CameraDirection, CameraResultType } from '@capacitor/camera';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
  useIonRouter,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { DataContext } from 'provider-lib';
import { useCallback, useContext, useEffect, useState } from 'react';
import AddressItem from '../../components/AddressItem';
import FadeIn from '../../components/FadeIn';
import ImageCropper from '../../components/ImageCropper';
import PaymentItem from '../../components/PaymentItem';
import './UserDetailPage.scss';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const UserDetailPage = () => {
  const { user, setUser, userPhoto, setUserPhoto } = useContext(DataContext);
  const [formData, setFormData] = useState<FormData>();
  const [cameraImage, setCameraImage] = useState<string>();
  const router = useIonRouter();

  const handleCropComplete = (dataImageUrl: string) => {
    setUserPhoto(dataImageUrl);
    setCameraImage(undefined);
    hideCropModal();
  };

  const [showCropModal, hideCropModal] = useIonModal(
    <ImageCropper
      image={cameraImage!}
      onCropComplete={handleCropComplete}
      closeModal={() => hideCropModal()}
    />,
  );

  useEffect(() => {
    if (user && userPhoto && !formData) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [formData, user, userPhoto]);

  const updateUser = useCallback(() => {
    if (user && formData) {
      setUser({ ...user, ...formData });
    }
  }, [user, formData, setUser]);

  const handlePictureClick = async () => {
    const image = await takePicture();
    setCameraImage(image);
    showCropModal();
  };

  return (
    <IonPage id="user-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <FadeIn isLoaded={user != null && formData != null}>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Profile</IonTitle>
            </IonToolbar>
          </IonHeader>
          {user && formData && (
            <>
              <div className="user-image" onClick={handlePictureClick}>
                <img
                  src={userPhoto}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <IonIcon icon={add} />
              </div>
              <div className="user-info">
                <IonList lines="full">
                  <IonItem>
                    <IonLabel>First name</IonLabel>
                    <IonInput
                      value={formData.firstName}
                      onIonChange={(e) => {
                        const value = e.detail.value!;
                        if (value) {
                          setFormData({ ...formData, firstName: value });
                        }
                      }}
                      onBlur={updateUser}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Last name</IonLabel>
                    <IonInput
                      value={formData.lastName}
                      onIonChange={(e) => {
                        const value = e.detail.value!;
                        if (value) {
                          setFormData({ ...formData, lastName: value });
                        }
                      }}
                      onBlur={updateUser}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Email Address</IonLabel>
                    <IonInput
                      value={formData.email}
                      onIonChange={(e) => {
                        setFormData({ ...formData, email: e.detail.value! });
                      }}
                      onBlur={updateUser}
                    ></IonInput>
                  </IonItem>
                </IonList>

                <div className="list-section">
                  <IonList lines="none">
                    <IonListHeader>Addresses 2</IonListHeader>
                    {user.addresses.map((address) => (
                      <AddressItem
                        key={address.id}
                        address={address}
                        selectable={false}
                        user={user}
                      />
                    ))}
                  </IonList>
                  <IonButton
                    expand="block"
                    color="secondary"
                    onClick={() => router.push('/address')}
                  >
                    New Address
                  </IonButton>
                </div>
              </div>

              <div className="list-section">
                <h4>Payment Methods</h4>
                <IonList lines="none">
                  {user.creditCards.map((creditCard) => (
                    <PaymentItem
                      key={creditCard.id}
                      creditCard={creditCard}
                      selectable={false}
                    />
                  ))}
                </IonList>
                <IonButton
                  expand="block"
                  color="secondary"
                  onClick={() => router.push('/payment')}
                >
                  New Payment Method
                </IonButton>
              </div>
            </>
          )}
        </IonContent>
      </FadeIn>
    </IonPage>
  );
};

async function takePicture() {
  const image = await Camera.getPhoto({
    quality: 100,
    width: 300,
    direction: CameraDirection.Front,
    resultType: CameraResultType.Uri,
  });
  return image.webPath;
}

export default UserDetailPage;
