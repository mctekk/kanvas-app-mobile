// Core
import { adminClient, client } from 'core/kanvas_client';

// Interfaces
import { IAppleInAppPurchaseProps } from 'core/interface/payment.interface';


export class PaymentService {

  /**
   * Handles the submission of an Apple In-App Purchase payment.
   *
   * @param {IAppleInAppPurchaseProps} paymentResponse - The response object containing details of the Apple In-App Purchase.
   * @returns {Promise<any>} - A promise that resolves to the response from creating an order from the Apple In-App Purchase receipt.
   * @throws {Error} - Throws an error if the payment submission fails.
   */
  async onIAPPaymentSummited(paymentResponse: IAppleInAppPurchaseProps) {
    try {

      const payment_data = {
        product_id: paymentResponse.productId,
        transaction_id: paymentResponse.transactionId,
        transaction_date: paymentResponse.transactionDate,
        receipt: paymentResponse.transactionReceipt,
      };

      const response = await adminClient.order.createOrderFromAppleInAppPurchaseReceipt({
        input: payment_data,
      });
      console.log('onIAPPaymentSummited', response);
      return response;
    } catch (error) {
      console.log('Error onIAPPaymentSummited', error);
      throw new Error(`Error onIAPPaymentSummited: ${error}`);
    }
  }

}

export default new PaymentService();
