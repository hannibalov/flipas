import { useQuery, useMutation, useQueryClient } from "react-query";
import { firebaseDB } from "../firebase/db"; // Your firebase DB methods
import { Video } from "../models/Video";

// Fetch all videos
export const useVideos = () => {
  return useQuery<Video[], Error>(["videos"], firebaseDB.getAll);
};

// Fetch a single video by ID
export const useVideo = (id: string) => {
  return useQuery<Video | undefined, Error>(
    ["video", id],
    () => firebaseDB.get(id),
    {
      enabled: !!id, // Only fetch if there's a valid ID
    }
  );
};

// Add or update a video
export const useUpsertVideo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (video: Video) => {
      await firebaseDB.upsert(video);
    },
    {
      onSuccess: () => {
        // Invalidate the 'videos' query to refetch data
        queryClient.invalidateQueries(["videos"]);
      },
    }
  );
};

// Remove a video
export const useRemoveVideo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      await firebaseDB.remove(id);
    },
    {
      onSuccess: () => {
        // Invalidate the 'videos' query to refetch data
        queryClient.invalidateQueries(["videos"]);
      },
    }
  );
};
