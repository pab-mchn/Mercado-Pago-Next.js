'use client';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';

initMercadoPago('public_key', { locale: 'es-AR' });

export default function ClientWallet() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const handleClick = async () => {
    const res = await fetch('/api/mercadopago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'producto con next',
        price: 1000,
        quantity: 1,
      }),
    });

    const data = await res.json();
    setPreferenceId(data.id);
  };

  return (
    <div>
      <button onClick={handleClick}>Pagar</button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
}
