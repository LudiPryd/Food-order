export const formatIDR = (value) =>
  Number(value || 0).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
