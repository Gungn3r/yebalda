import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import styles from './AddPost.module.scss';
import axios from 'axios';

export const AddPost = () => {
  const [action, setAction] = useState('buy');
  const [productName, setProductName] = useState('');
  const [volume, setVolume] = useState('');
  const [priceWithVAT, setPriceWithVAT] = useState('0.00');
  const [deliveryBasis, setDeliveryBasis] = useState('');
  const [deliveryPlace, setDeliveryPlace] = useState('');
  const [counterpartyOption, setCounterpartyOption] = useState('single');
  const [binIin, setBinIin] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const calculateTotalAmount = () => {
    const volumeValue = parseFloat(volume);
    const priceWithVATValue = parseFloat(priceWithVAT);

    if (!isNaN(volumeValue) && !isNaN(priceWithVATValue)) {
      return (volumeValue * priceWithVATValue).toFixed(2);
    } else {
      return '0.00';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/create-post', {
        action,
        productName,
        volume,
        priceWithVAT,
        deliveryBasis,
        deliveryPlace,
        counterpartyOption,
        binIin,
        additionalInfo,
      });
  
      // Обработка успешного ответа от сервера, например, перенаправление на другую страницу
      console.log('Post created successfully:', response.data);
      // Здесь можно добавить код для перенаправления на другую страницу или обновления данных в Redux Store
  
    } catch (error) {
      // Обработка ошибок при отправке данных на сервер
      console.error('Error creating post:', error);
      // Здесь можно добавить код для отображения ошибки пользователю
    }
  };

  return (
    <Paper style={{ padding: '30px' }}>
      <div className={styles['action-buttons']}>
        <Button
          onClick={() => setAction('buy')}
          variant={action === 'buy' ? 'contained' : 'outlined'}
          color="primary"
        >
          Купить
        </Button>
        <Button
          onClick={() => setAction('sell')}
          variant={action === 'sell' ? 'contained' : 'outlined'}
          color="primary"
        >
          Продать
        </Button>
      </div>

      <div className={styles['text-inputs']}>
        <TextField
          label="Введите наименование товара"
          variant="outlined"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <div className={styles['text-inputs']}>
        <TextField
          label="Введите объём товара в тоннах"
          variant="outlined"
          fullWidth
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>

      <div className={styles['amount-fields']}>
        <TextField
          label="Введите стоимость за 1 тонну с учётом НДС"
          variant="outlined"
          fullWidth
          type="number"
          value={priceWithVAT}
          onChange={(e) => setPriceWithVAT(e.target.value)}
        />

        <TextField
          label="Итоговая стоимость"
          variant="outlined"
          fullWidth
          value={calculateTotalAmount()}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>

      <div className={styles['delivery-fields']}>
        <TextField
          label="Базис поставки"
          variant="outlined"
          fullWidth
          value={deliveryBasis}
          onChange={(e) => setDeliveryBasis(e.target.value)}
        />

        <TextField
          label="Укажите место поставки"
          variant="outlined"
          fullWidth
          value={deliveryPlace}
          onChange={(e) => setDeliveryPlace(e.target.value)}
        />
      </div>

      <div className={styles['option-buttons']}>
        <Button
          onClick={() => setCounterpartyOption('single')}
          variant={counterpartyOption === 'single' ? 'contained' : 'outlined'}
          color="primary"
        >
          Один контрагент
        </Button>
        <Button
          onClick={() => setCounterpartyOption('multiple')}
          variant={counterpartyOption === 'multiple' ? 'contained' : 'outlined'}
          color="primary"
        >
          Несколько контрагентов
        </Button>
      </div>

      {counterpartyOption === 'single' && (
        <div className={styles['text-inputs']}>
          <TextField
            label="Введи БИН/ИИН"
            variant="outlined"
            fullWidth
            value={binIin}
            onChange={(e) => setBinIin(e.target.value)}
          />
        </div>
      )}

      <div className={styles['additional-info']}>
        <TextField
          label="Укажите дополнительные сведения"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </div>

      <Button type="submit" variant="contained" color="primary" className={styles['button']} onClick={handleSubmit}>
        Создать заявку
      </Button>
    </Paper>
  );
};

