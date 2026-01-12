import { Database } from "../database/drizzle.js";
import { Payments, Invoices } from "../models/index.js";
import { eq, sum } from "drizzle-orm";


// Pay Invoice (Full)
export const payInvoice = async (req, res, next) => {
  try {
    const { invoiceId } = req.params;
    const { amount, method } = req.body;

    // Required handler
    if (!amount || !method) {
      return res.status(400).json({
        success: false,
        message: "Amount and payment method are required.",
      });
    }

    // Check invoice
    const [invoice] = await Database
      .select()
      .from(Invoices)
      .where(eq(Invoices.id, invoiceId))
      .limit(1);

    // Not found handler
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    // Insert payment
    await Database.insert(Payments).values({
      invoiceId,
      amount,
      method,
    });

    // Calculate total paid
    const paidResult = await Database
      .select({ total: sum(Payments.amount) })
      .from(Payments)
      .where(eq(Payments.invoiceId, invoiceId));

    const totalPaid = Number(paidResult[0]?.total || 0);
    const totalAmount = Number(invoice.totalAmount);

    // Update invoice status
    let status = "unpaid";
    if (totalPaid >= totalAmount) status = "paid";

    await Database
      .update(Invoices)
      .set({ status })
      .where(eq(Invoices.id, invoiceId));

    return res.json({
      success: true,
      message: "Payment recorded.",
      status,
      totalPaid,
    });
  } catch (error) {
        return next(new Error(error.message));
  }
};
