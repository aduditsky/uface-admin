import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { useGlobalContext } from '../../context/global';
import { Bars } from 'react-loader-spinner';
import { gsap } from 'gsap';
import PictureCropper from 'components/cropper/cropper.component';
import {
  CloseButton,
  Container,
  FormContainer,
  Image,
  LoaderContainer,
  Modal,
} from './modal-edit.styles';
import { IPhoto } from 'components/clients/clients.components';
import moment from 'moment';

const ModalEdit = () => {
  const modalRef = useRef(null);
  const containerRef = useRef(null);
  const { editUser, setEditUser } = useGlobalContext();
  const [photo, setPhoto] = useState<string>('');

  //Get DB Data
  const [instituteS, setInstituteS] = useState(editUser?.vuz_kod);
  const [roleS, setRoleS] = useState(editUser?.role_kod);

  //Cropper
  const [cropperPhoto, setCropperPhoto] = useState<string>('');
  const [loadedPhoto, setLoadedPhoto] = useState<boolean>();
  const [cropperActive, setCropperActive] = useState<boolean>(false);

  //Func
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

      const mainPhoto: IPhoto[] = photo?.photos?.filter(
        (photoItem: IPhoto) => photoItem.main && photoItem
      );

      const { base64 } = mainPhoto[0];
      setPhoto(base64);
      return base64;
    }
  }

  // if (!editUser) return <></>;

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-Mail должен быть правильным')
      .required('E-Mail обязателен'),
    activated: Yup.bool(),
    phone_approve: Yup.bool(),
    fio: Yup.string(),
    fname: Yup.string().required('Имя обязательно'),
    lname: Yup.string().required('Фамилия обязательна'),
    sname: Yup.string(),
    phone: Yup.string().required('Телефон обязателен'),
    dateborn: Yup.string().required('Дата рождения обязательна'),
    role_kod: Yup.string().required('Роль обязательна'),
    vuz_kod: Yup.string().required('Институт обязателен'),
  });
  // get functions to build form with useForm() hook
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: editUser?.email,
      fname: editUser?.fname,
      activated: editUser?.activated,
      phone_approve: editUser?.phone_approve,
      lname: editUser?.lname,
      sname: editUser?.sname,
      dateborn: moment(editUser?.dateborn, 'YYYY-MM-DD').format('DD.MM.YYYY'),
      phone: editUser?.phone,
      role_kod: editUser?.role_kod,
      vuz_kod: editUser?.vuz_kod,
    },
  };

  const { register, handleSubmit, getValues, reset, formState } =
    useForm(formOptions);

  //Обновление фотки, если пользователь есть - изменять состояние, при изменении контекста
  useEffect(() => {
    //@ts-ignore
    reset(editUser);
  }, [editUser]);
  const { errors } = formState;

  interface IData {
    login: string | null;
    password: string | null;
    activated: string;
    phone_approve: string;
  }

  const updateCroppedPhoto = (photo: string) => {
    setPhoto(photo);
    setCropperActive(false);
  };

  const onError = (errors: any, e: any) => console.log({ errors, e });

  async function submitHandler(data: IData) {
    // const check = await onClickHandler(data);
    let login = sessionStorage.getItem('login');
    let password = sessionStorage.getItem('password');

    let api = editUser?.isCreate ? '/api/createFolk' : '/api/editFolk';

    console.log(
      editUser?.isCreate
        ? 'Создание пользователя'
        : 'Редактирование пользователя'
    );

    data.login = login;
    data.password = password;
    data.activated = `${data.activated}`;
    data.phone_approve = data.phone_approve ? '1' : '0';

    const res = await fetch(api, {
      method: 'PUT',
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = await res.json();
    // display form data on success

    // sessionStorage.setItem('user', JSON.stringify(data));
  }

  // const onClickHandler = async (user: IData) => {
  //   console.log({ user });
  // };

  //Анимации
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
  //Конец анимациям

  useEffect(() => {
    if (editUser !== null) {
      openFormAnimation();
    }

    reset();
    if (editUser && editUser?.isCreate === false) {
      getPhoto();
    }
  }, [editUser]);

  //Рендер
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
        {cropperActive && (
          <div className='upload-photo'>
            <PictureCropper
              img={photo}
              callBackFunc={() => setLoadedPhoto(false)}
              updateCropped={() => updateCroppedPhoto(photo)}
              closeFunc={() => {
                setCropperActive(false);
              }}
            ></PictureCropper>
          </div>
        )}

        {/* Форма */}
        <FormContainer>
          <div className='card w-100'>
            <h3 className='card-header'>
              {editUser.isCreate
                ? 'Создание пользователя'
                : 'Изменение пользователя'}
            </h3>
            <div className='card-body'>
              {!editUser?.isCreate && (
                <>
                  {photo !== '' ? (
                    <Image>{photo && <img src={photo} />}</Image>
                  ) : (
                    <LoaderContainer>
                      <Bars color='#2c2c2c' height={100} width={100} />
                    </LoaderContainer>
                  )}
                  <div className='buttons-block'>
                    <button
                      onClick={() => {
                        setCropperActive(true);
                      }}
                    >
                      Обрезать фото
                    </button>
                  </div>
                </>
              )}

              {/* Форма */}
              <form onSubmit={handleSubmit(submitHandler, onError)}>
                <div className='form-row'>
                  <div className='form-group col'>
                    <label>E-Mail</label>
                    <input
                      // @ts-ignore
                      name='email'
                      type='text'
                      {...register('email')}
                      className={`form-control ${
                        errors.email ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.email?.message}
                    </div>
                    <div>
                      <span>Email активирован: </span>
                      <input
                        // @ts-ignore
                        name='activated'
                        type='checkbox'
                        {...register('activated')}
                      />
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col'>
                    <label>Имя</label>
                    <input
                      // @ts-ignore
                      name='fname'
                      type='text'
                      {...register('fname')}
                      className={`form-control ${
                        errors.fname ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.fname?.message}
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col'>
                    <label>Фамилия</label>
                    <input
                      // @ts-ignore
                      name='lname'
                      type='text'
                      {...register('lname')}
                      className={`form-control ${
                        errors.lname ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.lname?.message}
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col'>
                    <label>Отчество</label>
                    <input
                      // @ts-ignore
                      name='sname'
                      type='text'
                      {...register('sname')}
                      className={`form-control ${
                        errors.sname ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.sname?.message}
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
                      className={`form-control ${
                        errors.phone ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.phone?.message}
                    </div>
                    <div>
                      <span>Телефон активирован: </span>
                      <input
                        // @ts-ignore
                        name='phone_approve'
                        type='checkbox'
                        {...register('phone_approve')}
                      />
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col'>
                    <label>Дата рождения</label>
                    <input
                      // @ts-ignore
                      name='dateborn'
                      type='date'
                      {...register('dateborn')}
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
                    <select
                      // @ts-ignore
                      name='role_kod'
                      // onChange={(e) => {
                      // 	setRoleS(e.target.value);
                      // }}
                      {...register('role_kod')}
                      className={`form-control ${
                        errors.role_kod ? 'is-invalid' : ''
                      }`}
                    >
                      <option value='1'>Гость</option>
                      <option value='2'>Студент</option>
                      <option value='3'>Преподаватель</option>
                      <option value='4'>Сотрудник</option>
                    </select>
                    <div className='invalid-feedback'>
                      {errors.role_kod?.message}
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col'>
                    <label>Институт</label>
                    <select
                      // @ts-ignore
                      name='vuz_kod'
                      // onChange={(e) => {
                      // 	setInstituteS(e.target.value);
                      // 	console.log(e.target.value);
                      // }}
                      {...register('vuz_kod')}
                      className={`form-control ${
                        errors.vuz_kod ? 'is-invalid' : ''
                      }`}
                    >
                      <option value='1'>Кампус НИ ТГУ</option>
                      <option value='2'>ТПУ</option>
                      <option value='3'>ТУСУР</option>
                      <option value='4'>ГМПИ (Ипполитовка)</option>
                    </select>
                    <div className='invalid-feedback'>
                      {errors.vuz_kod?.message}
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <button type='submit' className='btn btn-primary mr-1'>
                    Подтвердить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </FormContainer>
      </Container>
    </Modal>
  ) : (
    <></>
  );
};

export default ModalEdit;
