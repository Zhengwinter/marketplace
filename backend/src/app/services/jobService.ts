import { prisma } from '@/lib/prisma';
import { JobStatus } from '@prisma/client';

export const createJob = async ({
  title,
  customerId,
  category,
  smartPrice,
  arrivalWindow,
  acceptPrice,
}: {
  title: string;
  customerId: string;
  category: string;
  smartPrice: number;
  arrivalWindow: string;
  acceptPrice?: number;
}) => {
  return await prisma.job.create({
    data: {
      title,
      customerId,
      category,
      smartPrice,
      arrivalWindow,
      status: JobStatus.PENDING,
      acceptPrice,
    },
  });
};

export const updateJobStatus = async (jobId: string, status: JobStatus) => {
  return await prisma.job.update({
    where: { id: jobId },
    data: { status },
  });
};

export const assignProviderToJob = async (jobId: string, providerId: string) => {
  return await prisma.job.update({
    where: { id: jobId },
    data: { providerId },
  });
};
