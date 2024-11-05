import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { addFavorite, removeFavorite } from '@/services/api';
import { AppDispatch, RootState } from '@/store';
import {
  fetchUserFavoritesAsync,
  updateFavorites,
} from '@/store/slices/favorities';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UseFavorites() {
  const { user } = useSelector((state: RootState) => state.Auth);
  const favorites = useSelector((state: any) => state.favorities.favorites);
  let appToast = useContext<ToastContextInterface>(AppToastContext);

  const ToastLikeConfig: any = {
    type: 'success',
    duration: 4000,
  };

  const isPropertyFavorite = (propertyId: number) => {
    return (
      favorites.some((item: any) => item.property_id === propertyId) || false
    );
  };
  const dispatch: AppDispatch = useDispatch();
  const toggleFavorite = async (propertyId: number, isFavorited: boolean) => {
    try {
      if (!user) {
        appToast.setToast('Login to add to favourites', {
          ...ToastLikeConfig,
          type: 'fail',
        });
        return;
      }

      if (isFavorited) {
        await removeFavorite(propertyId)
          .then((res) => {
            appToast.setToast('Removed from favorites', ToastLikeConfig);
            dispatch(updateFavorites({ property: { id: propertyId } }));
          })
          .catch((err) => {
            appToast.setToast(
              err.response?.data?.message ||
                err.message ||
                'Something went very wrong',
              {
                ...ToastLikeConfig,
                type: 'fail',
              }
            );
          });
      } else {
        await addFavorite(propertyId)
          .then((res) => {
            appToast.setToast('Added to favorites', ToastLikeConfig);
            dispatch(updateFavorites({ property: res.property }));
          })
          .catch((err) => {
            appToast.setToast(
              err.response?.data?.message ||
                err.message ||
                'Something went very wrong',
              {
                ...ToastLikeConfig,
                type: 'fail',
              }
            );
          });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return {
    toggleFavorite,
    isPropertyFavorite,
  };
}
