import { contactUs } from "@/services/contact.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useContactUs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactUs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
    },
  });
};
