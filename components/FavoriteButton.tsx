import { Icon } from "@iconify/react";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { useCallback, useMemo } from "react";

interface FavoriteButtonProps {
  movieId: string;
}

function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId, mutateFavorites, mutate]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }
    const updateFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updateFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate]);

  return (
    <button
      className="flex items-center rounded-full active:scale-105"
      onClick={toggleFavorites}
    >
      <Icon
        icon={`${!isFavorite ? "gala:add" : "teenyicons:tick-circle-outline"}`}
        width={40}
        className="max-sm:w-6 hover:bg-white/10 rounded-full text-white "
      />
    </button>
  );
}

export default FavoriteButton;
