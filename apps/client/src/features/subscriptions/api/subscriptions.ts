import { API_URL, IS_DEMO_MODE } from "@/constants";
import {
  deleteDemoSubscription,
  editDemoSubscription,
  getDemoSubscriptions,
} from "./demo";
import {
  enableLocalFallback,
  isDatabaseUnavailableResponse,
  isLocalFallback,
} from "./localFallback";
import type { Subscription } from "@/types/types";
import type { UpdateSubscription } from "@/types/types";

export const getSubscriptions = async (): Promise<Subscription[]> => {
  if (IS_DEMO_MODE || isLocalFallback()) {
    return getDemoSubscriptions();
  }

  const response = await fetch(`${API_URL}/subscriptions`);
  const subscriptions = await response.json();

  if (isDatabaseUnavailableResponse(response, subscriptions)) {
    enableLocalFallback();
    return getDemoSubscriptions();
  }

  return subscriptions;
};

export const deleteSubscription = async (id: number) => {
  if (IS_DEMO_MODE || isLocalFallback()) {
    return deleteDemoSubscription(id);
  }

  const response = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: "DELETE",
  });
  const subscriptions = await response.json();

  if (isDatabaseUnavailableResponse(response, subscriptions)) {
    enableLocalFallback();
    return deleteDemoSubscription(id);
  }

  return subscriptions;
};

export const editSubscription = async (
  id: number,
  subscriptionData: UpdateSubscription
) => {
  if (IS_DEMO_MODE || isLocalFallback()) {
    return editDemoSubscription(id, subscriptionData);
  }

  try {
    const response = await fetch(`${API_URL}/subscriptions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    });

    const result = await response.json().catch(() => ({}));

    if (isDatabaseUnavailableResponse(response, result)) {
      enableLocalFallback();
      return editDemoSubscription(id, subscriptionData);
    }

    if (!response.ok) {
      throw new Error(result.message || "Error creating subscription");
    }

    return result;
  } catch (error) {
    throw new Error(`An error has occurred ${error}`);
  }
};
