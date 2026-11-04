import {
  createSubscriptionApi,
  getSubscriptionApi,
  getSubscriptions,
  subscriptionPlansApi,
} from "@/services/subscription.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateSubscription = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSubscriptionApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subscription_status"] });
    },
  });
};

export const useSubscriptionStatus = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["subscription_status", applicant_id],
    queryFn: () => getSubscriptionApi(applicant_id),
    enabled: !!applicant_id,
  });
};

// plans
export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["subscription_plans"],
    queryFn: subscriptionPlansApi,
  });
};

//
export const useSubscriptions = () => {
  const applicant_id = localStorage.getItem("applicantId");
  console.log(applicant_id);

  return useQuery({
    queryKey: ["subscriptions", applicant_id],
    queryFn: () => getSubscriptions(applicant_id),
    enabled: !!applicant_id,
  });
};
