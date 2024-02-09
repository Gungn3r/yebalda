import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      registrationDate: new Date().toLocaleDateString(),
      resident: true,
      name_company: '',
      bin: '',
      registered_address: '',
      actual_address: '',
      email_1: '',
      email_2: '',
      email_3: '',
      phone: '',
      role: 'USER',
      account_number: '',
      name_of_the_bank: '',
      bik: '',
      kbe: '',
      kor_count: '',
      additional_information: '',
      name_of_manager: '',
      management_position: '',
      contract_currency: 'KZT',
      name_person: '',
      position: '',
      phone_person: '',
      name_bookkeeper: '',
      phone_bookkeeper: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="lg">
      <Paper classes={{ root: styles.root }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography classes={{ root: styles.title }} variant="h5">
            Создание аккаунта
          </Typography>
          <div className={styles.avatar}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </div>
          <TextField
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName', { required: 'Укажите полное имя' })}
            className={styles.field}
            label="Полное имя"
            fullWidth
          />
          <TextField
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            type="email"
            {...register('email', { required: 'Укажите почту' })}
            className={styles.field}
            label="E-Mail"
            fullWidth
          />
          <TextField
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            type="password"
            {...register('password', { required: 'Укажите пароль' })}
            className={styles.field}
            label="Пароль"
            fullWidth
          />

          {/* Добавленные поля */}
          <TextField
            {...register('name_company')}
            className={styles.field}
            label="Наименование компании"
            fullWidth
          />

          <TextField
            {...register('bin')}
            className={styles.field}
            label="БИН"
            fullWidth
          />
          <TextField
            {...register('registered_address')}
            className={styles.field}
            label="Юридический адрес"
            fullWidth
          />
          <TextField
            {...register('actual_address')}
            className={styles.field}
            label="Фактический адрес"
            fullWidth
          />
          <TextField
            {...register('email_1')}
            className={styles.field}
            label="Почта 1"
            fullWidth
          />
          <TextField
            {...register('email_2')}
            className={styles.field}
            label="Почта 2"
            fullWidth
          />
          <TextField
            {...register('email_3')}
            className={styles.field}
            label="Почта 3"
            fullWidth
          />
          <TextField
            {...register('phone')}
            className={styles.field}
            label="Номер телефона"
            fullWidth
          />
          <TextField
            select
            {...register('role')}
            className={styles.field}
            label="Role"
            fullWidth
          >
            <MenuItem value="USER">user</MenuItem>
            <MenuItem value="ADMIN">admin</MenuItem>
          </TextField>
          
          <TextField
            {...register('account_number')}
            className={styles.field}
            label="Номер счета"
            fullWidth
          />
          <TextField
            {...register('name_of_the_bank')}
            className={styles.field}
            label="Наименование банка"
            fullWidth
          />
          <TextField
            {...register('bik')}
            className={styles.field}
            label="БИК"
            fullWidth
          />
          <TextField
            {...register('kbe')}
            className={styles.field}
            label="КБе"
            fullWidth
          />
          <TextField
            {...register('kor_count')}
            className={styles.field}
            label="Корр. счет"
            fullWidth
          />
          <TextField
            {...register('additional_information')}
            className={styles.field}
            label="Дополнительная информация"
            multiline
            rows={4}
            fullWidth
          />
          {/* Вторая колонка */}
          <TextField
            {...register('name_of_manager')}
            className={styles.field}
            label="ФИО руководителя"
            fullWidth
          />
          <TextField
            {...register('management_position')}
            className={styles.field}
            label="Должность руководителя"
            fullWidth
          />
          <TextField
            select
            {...register('contract_currency')}
            className={styles.field}
            label="Валюта контракта"
            fullWidth
          >
            <MenuItem value="KZT">KZT</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </TextField>
          <TextField
            {...register('name_person')}
            className={styles.field}
            label="ФИО сотрудника"
            fullWidth
          />
          <TextField
            {...register('position')}
            className={styles.field}
            label="Должность сотрудника"
            fullWidth
          />
          <TextField
            {...register('phone_person')}
            className={styles.field}
            label="Телефон сотрудника"
            fullWidth
          />
          <TextField
            {...register('name_bookkeeper')}
            className={styles.field}
            label="ФИО бухгалтера"
            fullWidth
          />
          <TextField
            {...register('phone_bookkeeper')}
            className={styles.field}
            label="Телефон бухгалтера"
            fullWidth
          />
 
          <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
