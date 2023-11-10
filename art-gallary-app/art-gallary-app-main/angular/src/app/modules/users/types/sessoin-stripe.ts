export interface StripeCheckoutResponse {
  status: string;
  session: StripeCheckoutSession;
}

interface StripeCheckoutSession {
  id: string;
  object: string;
  after_expiration: any;
  allow_promotion_codes: any;
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: {
    enabled: boolean;
    status: any;
  };
  billing_address_collection: any;
  cancel_url: string;
  client_reference_id: any;
  consent: any;
  consent_collection: any;
  created: number;
  currency: string;
  currency_conversion: any;
  custom_fields: any[];
  custom_text: {
    shipping_address: any;
    submit: any;
  };
  customer: any;
  customer_creation: string;
  customer_details: {
    address: any;
    email: string;
    name: any;
    phone: any;
    tax_exempt: string;
    tax_ids: any;
  };
  customer_email: string;
  expires_at: number;
  invoice: any;
  invoice_creation: {
    enabled: boolean;
    invoice_data: {
      account_tax_ids: any;
      custom_fields: any;
      description: any;
      footer: any;
      metadata: {};
      rendering_options: any;
    };
  };
  livemode: boolean;
  locale: any;
  metadata: {
    address: string;
    cartId: string;
    shippingPrice: string;
  };
  mode: string;
  payment_intent: any;
  payment_link: any;
  payment_method_collection: string;
  payment_method_options: {};
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: {
    enabled: boolean;
  };
  recovered_from: any;
  setup_intent: any;
  shipping_address_collection: any;
  shipping_cost: any;
  shipping_details: any;
  shipping_options: any[];
  status: string;
  submit_type: any;
  subscription: any;
  success_url: string;
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  };
  url: string;
}