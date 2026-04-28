export type EventPaymentMethod = {
  id: string;
  type: "inr" | "usdt";
  displayLabel: string;
  qrCodeUrl: string | null;
  walletId: string | null;
  upiId: string | null;
  usdtNetwork: string | null;
  instructions: string | null;
};

export type PublicEvent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  registrationDeadline: string;
  deliveryPlatform: string;
  bannerUrl: string | null;
  priceUsd: number;
  maxParticipants: number;
  occupiedSeats: number;
  seatsRemaining: number;
  isFull: boolean;
  paymentMethod: EventPaymentMethod | null;
};

type EventsApiResponse = {
  message?: string;
  data?: PublicEvent[];
};

const API_BASE_URL = "https://api.marketlabedu.com";

export async function fetchPublicEvents(): Promise<PublicEvent[]> {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to load events (${response.status}).`);
  }

  const payload = (await response.json()) as EventsApiResponse;
  if (!Array.isArray(payload.data)) {
    return [];
  }

  return payload.data;
}
