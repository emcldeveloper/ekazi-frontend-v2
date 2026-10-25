import type { LanguagePayload } from "@/@types/profile/profile";
import {
  createLanguage,
  deleteLanguage,
  updateLanguage,
} from "@/services/profile.service";
import {
  getLanguages,
  languageRead,
  languageSpeak,
  languageUnderstand,
  languageWrite,
} from "@/services/universals.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLanguages = () =>
  useQuery({
    queryFn: getLanguages,
    queryKey: ["language"],
  });

export const useLanguageRead = () =>
  useQuery({
    queryFn: languageRead,
    queryKey: ["language-read"],
  });

export const useLanguageWrite = () =>
  useQuery({
    queryFn: languageWrite,
    queryKey: ["language-write"],
  });

export const useLanguageSpeak = () =>
  useQuery({
    queryFn: languageSpeak,
    queryKey: ["language-speak"],
  });

export const useLanguageUnderstand = () =>
  useQuery({
    queryFn: languageUnderstand,
    queryKey: ["language-understand"],
  });

export const useCreateLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: LanguagePayload }) =>
      updateLanguage(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (languageId: number) => deleteLanguage(languageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
