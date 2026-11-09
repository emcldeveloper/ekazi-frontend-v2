import { applyJobEmail } from "@/services/jobs.service";
import { useMutation } from "@tanstack/react-query";

export const useApplyJobByEmail = () => {
  return useMutation({
    mutationFn: applyJobEmail,
  });
};
