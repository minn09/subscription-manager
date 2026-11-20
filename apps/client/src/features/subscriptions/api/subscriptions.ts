import { API_URL, IS_DEMO_MODE } from "@/constants";
import {
  deleteDemoSubscription,
  editDemoSubscription,
  getDemoSubscriptions,
} from "./demo";
import type { Subscription } from "@/types/types";
import type { UpdateSubscription } from "@/types/types";

export const getSubscriptions = async (): Promise<Subscription[]> => {
  if (IS_DEMO_MODE) {
    return getDemoSubscriptions();
  }

  const response = await fetch(`${API_URL}/subscriptions`);
  const subscriptions = await response.json();
  return subscriptions;
};

export const deleteSubscription = async (id: number) => {
  if (IS_DEMO_MODE) {
    return deleteDemoSubscription(id);
  }

  const response = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: "DELETE",
  });
  const subscriptions = await response.json();
  return subscriptions;
};

export const editSubscription = async (
  id: number,
  subscriptionData: UpdateSubscription
) => {
  if (IS_DEMO_MODE) {
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

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Error creating subscription");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`An error has occurred ${error}`);
  }
};
