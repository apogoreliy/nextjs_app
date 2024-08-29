-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_customer_id_fkey";

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
