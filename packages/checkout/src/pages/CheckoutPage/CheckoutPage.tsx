import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { Address, CreditCard, DataContext } from 'provider-lib';
import React, { useContext, useEffect, useState } from 'react';
import AddressItem from '../../components/AddressItem';
import FadeIn from '../../components/FadeIn';
import PaymentItem from '../../components/PaymentItem';
import './CheckoutPage.scss';

interface CheckoutPageProps {
  onDismiss?: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onDismiss }) => {
  const { cart, user, checkout } = useContext(DataContext);
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [selectedCreditCard, setSelectedCreditCard] = useState<CreditCard>();
  const router = useIonRouter();

  useEffect(() => {
    if (user && !selectedAddress) {
      const address = user.addresses.find((x) => x.preferred);
      if (address) {
        setSelectedAddress(address);
      }
    }
    if (user && !selectedCreditCard) {
      const creditCard = user.creditCards.find((x) => x.preferred);
      if (creditCard) {
        setSelectedCreditCard(creditCard);
      }
    }
  }, [selectedAddress, selectedCreditCard, user]);

  return (
    <IonPage id="checkout-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => (onDismiss ? onDismiss() : null)}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Checkout Micro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <FadeIn isLoaded={user != null && cart != null}>
        <IonContent className="ion-padding">
          {cart && user && (
            <>
              <IonList lines="none">
                <IonListHeader>Delivery</IonListHeader>
                {user.addresses.map((address) => (
                  <AddressItem
                    key={address.id}
                    address={address}
                    onAddressSelected={(address) => setSelectedAddress(address)}
                    selectedId={selectedAddress?.id}
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

              <IonList lines="none">
                <IonListHeader>Payment</IonListHeader>
                {user.creditCards.map((creditCard) => (
                  <PaymentItem
                    key={creditCard.id}
                    creditCard={creditCard}
                    selectedId={selectedCreditCard?.id}
                    onPaymentSelected={(creditCard) =>
                      setSelectedCreditCard(creditCard)
                    }
                    selectable={true}
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

              <IonList lines="none">
                <IonListHeader>Review total</IonListHeader>
                <IonItem>
                  <IonLabel>${cart.subTotal} + Tax</IonLabel>
                </IonItem>
              </IonList>
              <IonButton
                className="order-button"
                expand="block"
                onClick={() => {}}
              >
                Place Your Order
              </IonButton>
            </>
          )}
        </IonContent>
      </FadeIn>
    </IonPage>
  );
};

export default CheckoutPage;
