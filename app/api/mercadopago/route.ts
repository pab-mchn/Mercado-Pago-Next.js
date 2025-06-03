import { NextRequest } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: 'secret_key',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const preferenceData = {
      items: [
        {
          title: body.title,
          quantity: Number(body.quantity),
          unit_price: Number(body.price),
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: 'https://www.youtube.com/@onthecode',
        failure: 'https://www.youtube.com/@onthecode',
        pending: 'https://www.youtube.com/@onthecode',
      },
      auto_return: 'approved',
    };

    const preference = new Preference(client);
    const result = await preference.create({ body: preferenceData });

    return new Response(JSON.stringify({ id: result.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    return new Response(JSON.stringify({ error: 'Error al crear la preferencia :(' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
