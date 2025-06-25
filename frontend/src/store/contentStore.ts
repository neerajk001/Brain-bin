import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../config';
import { AxiosError } from 'axios';


export interface Content {
  _id?: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "images" | "documents" | "instagram";
  tags: string[];
  shareLink?: string;
}

// 🧠 This is the type for what the shared link returns
interface SharedContentResponse {
  username: string;
  content: Content[];
}

interface ContentStore {
  contents: Content[];
  sharedContent: SharedContentResponse | null;
  isLoading: boolean;

  postContent: (data: Content) => Promise<boolean>;
  getContents: () => void;
  deleteContent: (id: string) => void;
  shareContent: (shouldShare: boolean) => Promise<string | null>;
  getSharedContent: (shareLinkId: string) => void;
}

export const contentStore = create<ContentStore>((set, get) => ({
  contents: [],
  sharedContent: null,
  isLoading: false,

  postContent: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/content`, data, {
        withCredentials: true,
      });

      set((state) => ({
        contents: [...state.contents, res.data],
      }));
      toast.success('Content added');
      await get().getContents();
      return true;
    } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || 'Failed to post content');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  getContents: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        withCredentials: true,
      });
      set({ contents: res.data.content });
    } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || 'Failed to fetch contents');
    } finally {
      set({ isLoading: false });
    }
  },

  deleteContent: async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        contents: state.contents.filter((content) => content._id !== id),
      }));
      toast.success('Content deleted');
    } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || 'Failed to delete content');
    }
  },

  shareContent: async (shouldShare: boolean) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: shouldShare },
        { withCredentials: true }
      );
      if (res.data.hash) {
        toast.success('Link created successfully');
        return `${window.location.origin}/share/${res.data.hash}`;
      } else {
        toast.success('Share link removed');
        return null;
      }
    } catch (err:unknown) {
        const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || 'Failed to update share link');
      return null;
    }
  },

  getSharedContent: async (shareLink: string) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
      set({
        sharedContent: {
          username: res.data.username,
          content: res.data.content,
        },
      });
    } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || 'Failed to load shared content');
    } finally {
      set({ isLoading: false });
    }
  },
}));
