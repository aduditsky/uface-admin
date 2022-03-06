import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { useGlobalContext } from '../../context/global';
import { Bars } from 'react-loader-spinner';
import { gsap } from 'gsap';

import {
  CloseButton,
  Container,
  FormContainer,
  Image,
  LoaderContainer,
  Modal,
} from './modal-edit.styles';
import { IPhoto } from 'components/clients/clients.components';

const ModalEdit = () => {
  const modalRef = useRef(null);
  const containerRef = useRef(null);
  const { editUser, setEditUser } = useGlobalContext();
  const [photo, setPhoto] = useState<string>('');

  async function getPhoto() {
    if (editUser) {
      let login = sessionStorage.getItem('login');
      let password = sessionStorage.getItem('password');
      let height = 200;

      const userData = { login, password, height, pid: editUser.personid };
      const resPhoto = await fetch('/api/getPhotoFolk', {
        method: 'POST',
        body: JSON.stringify({ userData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const photo = await resPhoto.json();

      const mainPhoto: IPhoto[] = photo.photos.filter(
        (photoItem: IPhoto) => photoItem.main && photoItem
      );

      const { base64 } = mainPhoto[0];
      setPhoto(base64);
      return base64;
    }
  }

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('E-Mail обязателен'),
    fio: Yup.string().required('Фио обязателен'),
    phone: Yup.string().required('Телефон обязателен'),
    datebornborn: Yup.string()
      .required('Дата рождения обязательна')
      .matches(
        /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/g,
        '1-31. максимум 2 цифры - месяцы могут иметь ведущие нули. 1-12. максимум 2 цифры - годы 1900-2099. 4 цифры'
      ),
    folkrole: Yup.string().required('Роль обязательна'),
    instiute: Yup.string().required('Институт обязателен'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  interface IData {
    login: string;
    password: string;
  }

  async function submitHandler(data: IData) {
    const check = await onClickHandler(data);
    // display form data on success

    sessionStorage.setItem('user', JSON.stringify(check));
  }

  const onClickHandler = async (user: IData) => {
    console.log({ user });
  };

  const openFormAnimation = () => {
    gsap
      .timeline()
      .to(modalRef.current, {
        duration: 0.25,
        ease: 'sine',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      })
      .set(modalRef.current, {
        pointerEvents: 'all',
      });

    gsap.to(containerRef.current, {
      translateX: '0%',
      ease: 'sine',
      duration: 0.25,
    });
  };

  const closeFormAnimation = () => {
    gsap
      .timeline()
      .to(modalRef.current, {
        duration: 0.25,
        ease: 'sine',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
      })
      .set(modalRef.current, {
        pointerEvents: 'none',
      });

    gsap.to(containerRef.current, {
      translateX: '105%',
      duration: 0.25,
      ease: 'sine',
      onComplete: () => {
        setEditUser(null);
        setPhoto('');
      },
    });
  };

  useEffect(() => {
    if (editUser !== null) {
      openFormAnimation();
    }

    reset();
    getPhoto();
  }, [editUser]);

  return editUser ? (
    <Modal
      ref={modalRef}
      onClick={(event) => {
        //@ts-ignore
        if (!containerRef.current.contains(event.target)) {
          closeFormAnimation();
        }
      }}
    >
      <Container ref={containerRef}>
        <CloseButton
          onClick={() => {
            closeFormAnimation();
          }}
        >
          ✖
        </CloseButton>
        {photo !== '' ? (
          <FormContainer>
            <div className='card w-100'>
              <h3 className='card-header'>Изменение пользователя</h3>
              <div className='card-body'>
                <Image>{photo && <img src={photo} />}</Image>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label>E-Mail</label>
                      <input
                        // @ts-ignore
                        name='email'
                        type='text'
                        value={editUser.email}
                        {...register('email')}
                        className={`form-control ${
                          errors.email ? 'is-invalid' : ''
                        }`}
                      />
                      <div className='invalid-feedback'>
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label>ФИО</label>
                      <input
                        // @ts-ignore
                        name='fio'
                        type='text'
                        value={editUser.fio}
                        {...register('fio')}
                        className={`form-control ${
                          errors.fio ? 'is-invalid' : ''
                        }`}
                      />
                      <div className='invalid-feedback'>
                        {errors.fio?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label>Телефон</label>
                      <input
                        // @ts-ignore
                        name='phone'
                        type='text'
                        {...register('phone')}
                        value={editUser.phone}
                        className={`form-control ${
                          errors.phone ? 'is-invalid' : ''
                        }`}
                      />
                      <div className='invalid-feedback'>
                        {errors.phone?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label>Дата рождения</label>
                      <input
                        // @ts-ignore
                        name='dateborn'
                        type='text'
                        {...register('dateborn')}
                        value={editUser.date_created}
                        className={`form-control ${
                          errors.dateborn ? 'is-invalid' : ''
                        }`}
                      />
                      <div className='invalid-feedback'>
                        {errors.dateborn?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label>Роль</label>
                      <input
                        // @ts-ignore
                        name='folkrole'
                        type='text'
                        value={editUser.role}
                        {...register('folkrole')}
                        className={`form-control ${
                          errors.folkrole ? 'is-invalid' : ''
                        }`}
                      />
                      <div className='invalid-feedback'>
                        {errors.folkrole?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label>Институт</label>
                      <input
                        // @ts-ignore
                        name='institute'
                        type='text'
                        {...register('institute')}
                        value={editUser.role}
                        className={`form-control ${
                          errors.institute ? 'is-invalid' : ''
                        }`}
                      />
                      <div className='invalid-feedback'>
                        {errors.institute?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <button type='submit' className='btn btn-primary mr-1'>
                      Подтвердить
                    </button>
                  </div>
                </form>
                <p>Тут будут сообщения об ошибках</p>
              </div>
            </div>
          </FormContainer>
        ) : (
          <LoaderContainer>
            <Bars color='#2c2c2c' height={100} width={100} />
          </LoaderContainer>
        )}
      </Container>
    </Modal>
  ) : (
    <></>
  );
};

export default ModalEdit;
