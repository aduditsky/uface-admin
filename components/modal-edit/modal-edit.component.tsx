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
import moment from 'moment';

const ModalEdit = () => {
	const modalRef = useRef(null);
	const containerRef = useRef(null);
	const { editUser, setEditUser } = useGlobalContext();
	const [photo, setPhoto] = useState<string>('');
	const [instituteS, setInstituteS] = useState(editUser?.vuz_kod);
	const [roleS, setRoleS] = useState(editUser?.role_kod);

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
		email: Yup.string()
			.email('E-Mail должен быть правильным')
			.required('E-Mail обязателен'),
		fio: Yup.string().required('Фио обязателен'),
		fname: Yup.string().required('Имя обязательно'),
		lname: Yup.string().required('Фамилия обязательна'),
		sname: Yup.string(),
		phone: Yup.string().required('Телефон обязателен'),
		dateborn: Yup.string().required('Дата рождения обязательна'),

		role_kod: Yup.string().required('Роль обязательна'),
		vuz_kod: Yup.string().required('Институт обязателен'),
	});
	// get functions to build form with useForm() hook
	console.log(moment(editUser?.dateborn, 'YYYY-MM-DD').format('DD.MM.YYYY'));
	const formOptions = {
		resolver: yupResolver(validationSchema),
		defaultValues: {
			email: editUser?.email,
			fname: editUser?.fname,
			lname: editUser?.lname,
			sname: editUser?.sname,
			dateborn: moment(editUser?.dateborn, 'YYYY-MM-DD').format('DD.MM.YYYY'),
			phone: editUser?.phone,
			role_kod: editUser?.role_kod,
			vuz_kod: editUser?.vuz_kod,
		},
	};
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	useEffect(() => {
		reset(editUser);
	}, [editUser]);
	const { errors } = formState;
	interface IData {
		login: string;
		password: string;
	}

	async function submitHandler(data: IData) {
		// const check = await onClickHandler(data);
		let login = sessionStorage.getItem('login');
		let password = sessionStorage.getItem('password');
		console.log({ daoskd: data });
		data.login = login;
		data.password = password;
		// const user = { login, password, limit, offset: offset * limit };
		const res = await fetch('/api/editFolk', {
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
