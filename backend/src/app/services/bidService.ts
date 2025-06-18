import { prisma } from '@/lib/prisma';

export const createBid = async ({
  jobId,
  providerId,
  price,
  note,
  eta,
}: {
  jobId: string;
  providerId: string;
  price: number;
  note?: string;
  eta: number; // in minutes
}) => {
  return await prisma.bid.create({
    data: {
      jobId,
      providerId,
      price,
      note,
      eta,
    },
  });
};

export const getTopRankedBids = async (jobId: string, topN = 3) => {
  const bids = await prisma.bid.findMany({
    where: { jobId },
    include: {
      provider: true,
    },
  });

  // Rank by (price * rating * ETA), assuming rating is 1–5
  const ranked = bids
    .map(bid => ({
      ...bid,
      score: bid.price * (bid.provider.rating || 1) * bid.eta,
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, topN);

  return ranked;
};

export const autoHireIfBidBelowAcceptPrice = async (jobId: string) => {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job?.acceptPrice) return null;

  const bid = await prisma.bid.findFirst({
    where: {
      jobId,
      price: { lte: job.acceptPrice },
    },
    orderBy: { price: 'asc' },
  });

  if (bid) {
    await prisma.job.update({
      where: { id: jobId },
      data: {
        providerId: bid.providerId,
        status: 'FILLED',
      },
    });
  }

  return bid;
};
