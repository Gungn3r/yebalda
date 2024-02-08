import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts.js';

export const Post = ({
  id,
  productName,
  createdAt,
  user,
  isFullPost,
  isLoading,
  isEditable,
  volume,
  priceWithVAT,
  deliveryBasis,
  deliveryPlace,
  counterpartyOption,
  binIin,
  additionalInfo,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить заявку?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.productName, { [styles.productNameFull]: isFullPost })}>
            {isFullPost ? (
              productName
            ) : (
              <Link to={`/posts/${id}`} state={{ id }}>
                {productName}
              </Link>
            )}
          </h2>
          {isFullPost && (
            <div>
              <p>
                <strong>Объем товара:</strong> {volume} тонн
              </p>
              <p>
                <strong>Стоимость за 1 тонну с учетом НДС:</strong> {priceWithVAT}
              </p>
              <p>
                <strong>Базис поставки:</strong> {deliveryBasis}
              </p>
              <p>
                <strong>Место поставки:</strong> {deliveryPlace}
              </p>
              {counterpartyOption === 'single' && (
                <p>
                  <strong>БИН/ИИН:</strong> {binIin}
                </p>
              )}
              <p>
                <strong>Дополнительные сведения:</strong> {additionalInfo}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
