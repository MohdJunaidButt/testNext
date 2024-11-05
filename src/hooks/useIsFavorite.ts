// hooks/useIsFavorite.ts
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface UseIsFavoriteProps {
  propertyId: number | null | undefined;
}

const useIsFavorite = ({ propertyId }: UseIsFavoriteProps) => {
  const isFavorite = useSelector((state: RootState) =>
    state.favorities.favorites.some(
      (favorite: any) => favorite.property_id === propertyId
    )
  );
  return isFavorite;
};

export default useIsFavorite;
