import { prisma } from '@/lib/prisma';
import { sendNotificationToProvider } from '@/utils/notifications';
import { Provider } from '@prisma/client';

const waveDelays = [0, 10000, 20000]; // ms between waves

export const dispatchJobInWaves = async (jobId: string) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { customer: true },
  });
  if (!job) return;

  const customerLocation ={
    latitude: job.customer.latitude,
    longitude: job.customer.longitude,
  };
  const waves = await getProviderWaves(customerLocation);

  for (let i = 0; i < waves.length; i++) {
    const wave = waves[i];
    setTimeout(() => {
      wave.forEach(provider =>
        sendNotificationToProvider(provider.id, {
          type: 'NEW_JOB',
          jobId: job.id,
        }),
      );
    }, waveDelays[i]);
  }
};

type Coordinates = { latitude: number; longitude: number };

const getProviderWaves = async (location: Coordinates) => {
  const allProviders = await prisma.provider.findMany({
  });

  const tierA: typeof allProviders = [];
  const tierB: typeof allProviders = [];
  const tierC: typeof allProviders = [];

  for (const provider of allProviders) {
    const providerCoords = {
      latitude: provider.latitude,
      longitude: provider.longitude,
    };

    const distance = getDistance(location, providerCoords); // in km

    if (distance <= 2) tierA.push(provider);
    else if (distance <= 5) tierB.push(provider);
    else tierC.push(provider);
  }

  return [tierA, tierB, tierC];
};

function getDistance(a: Coordinates, b: Coordinates): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);

  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const aHarv =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
}
