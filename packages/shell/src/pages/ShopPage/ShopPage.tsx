import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { DataContext } from 'provider-lib';
import { useContext } from 'react';

import './ShopPage.scss';

const ShopPage = () => {
  const { productList } = useContext(DataContext);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 2,
  });

  return (
    <IonPage id="shop-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shop</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Shop 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <h2>New &amp; Featured</h2>
          <div className="product-list">
            {productList.map((product) => (
              <IonCard
                key={product.id}
                routerLink={`/shop/${product.id}`}
                routerDirection="forward"
              >
                <img
                  alt={product.title}
                  decoding="async"
                  src={`/images/${product.image}`}
                />
                <IonCardTitle>{product.title}</IonCardTitle>
                <IonCardSubtitle>
                  {formatter.format(product.price)}
                </IonCardSubtitle>
              </IonCard>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ShopPage;
