export type PaymentModelType = {
    payment_id: number;
    amount: number;
    mode: "card" | "cash" | "bank" | "wallet";
    createdAt: Date;
    updatedAt: Date;
}