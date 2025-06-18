/*
  Warnings:

  - Added the required column `acceptPrice` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "acceptPrice" DOUBLE PRECISION NOT NULL;
