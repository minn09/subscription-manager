import { createDemoSubscription } from "@/features/subscriptions/api/demo";
import {
  enableLocalFallback,
  isDatabaseUnavailableResponse,
  isLocalFallback,
} from "@/features/subscriptions/api/localFallback";
import { API_URL, IS_DEMO_MODE } from "@/constants";
import type { CreateSubscription } from "@/types/types";

export const createSubscription = async (
  subscriptionData: CreateSubscription
) => {
  if (IS_DEMO_MODE || isLocalFallback()) {
    return createDemoSubscription(subscriptionData);
  }

  try {
    const response = await fetch(`${API_URL}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    });

    const result = await response.json().catch(() => ({}));

    if (isDatabaseUnavailableResponse(response, result)) {
      enableLocalFallback();
      return createDemoSubscription(subscriptionData);
    }

    if (!response.ok) {
      throw new Error(result.message || "Error creating subscription");
    }

    return result;
  } catch (error) {
    throw new Error(`An error has occurred ${error}`);
  }
};
