import React from 'react'
import {FormikHelpers, useFormik} from 'formik'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material'
import {useAppDispatch} from 'common/hooks';
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {authThunks} from './auth.reducer';
import {LoginParamsType} from 'features/auth/auth.api';
import {ResponseType} from 'common/types';

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(selectIsLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
            dispatch(authThunks.login(values))
                // положительный ответ не обрабатываем так как нужна ошибка
                // для обработки в форме ошибок: .unwrap() - в компоненте на UI отловили ошибку что в форме некорректно ввели данные: отловим в network ошибку и покажем юзеру
                // .unwrap() - чтобы в тулките отрабатывал кейс catch
                .unwrap()
                .catch((reason: ResponseType) => {
                    const {fieldsErrors} = reason
                    if (fieldsErrors) {
                        fieldsErrors.forEach((fieldError) => {
                            // покажем ошибку чтобы она не глобально появлялась а под конкретной формой с ошибкой при логинизации
                            formikHelpers.setFieldError(fieldError.field, fieldError.error)

                /*            // чтобы обработать ошибку не только в емайле а в обоих полях - используют когда огромные формы в проектах
                            // тоесть пришел массив из 2 ошибок - пробегаемся по массиву и покажем ошибки
                            reason.fieldsErrors.forEach(fieldError => formikHelpers.setFieldError(fieldError.field, fieldError.error))       */
                        })
                    }
                })
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }


    return <Grid container justifyContent="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                        target={'_blank'}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p> Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
