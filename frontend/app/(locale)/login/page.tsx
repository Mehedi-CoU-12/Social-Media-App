'use client'
import Loader from '@/components/Loader'
import { useLogin } from './useLogin'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import api from '@/lib/axiosInstance'
import toast from 'react-hot-toast'
import { LoginPayload } from '@/app/types/types'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'

export default function RegisterPage() {
    //TODO: redirect if logged in
    // const { data: authUser, status: loginStatus } = useAuth()

    const { state, setField } = useLogin()
    const { email, password, agree } = state
    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: LoginPayload) => {
            const res = await api.post('/api/users/login', payload)
            return res.data
        },
        onSuccess: (user) => router.replace(`/profile/${user.username}`),
        onError: () => toast.error('Invalid email or password'),
    })

    if (isPending) return <Loader />

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password || !agree) {
            toast.error('Please fill all fields & agree to terms')
            return
        }

        mutate({ email, password, agree })
    }

    return (
        <section className="_social_registration_wrapper _layout_main_wrapper">
            <div className="_shape_one">
                <img src="/images/shape1.svg" alt="" className="_shape_img" />
                <img
                    src="/images/dark_shape.svg"
                    alt=""
                    className="_dark_shape"
                />
            </div>
            <div className="_shape_two">
                <img src="/images/shape2.svg" alt="" className="_shape_img" />
                <img
                    src="/images/dark_shape1.svg"
                    alt=""
                    className="_dark_shape _dark_shape_opacity"
                />
            </div>
            <div className="_shape_three">
                <img src="/images/shape3.svg" alt="" className="_shape_img" />
                <img
                    src="/images/dark_shape2.svg"
                    alt=""
                    className="_dark_shape _dark_shape_opacity"
                />
            </div>

            <div className="_social_registration_wrap">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="_social_registration_right">
                                <div className="_social_registration_right_image">
                                    <img
                                        src="/images/login.png"
                                        alt="Registration"
                                    />
                                </div>
                                <div className="_social_registration_right_image_dark">
                                    <img
                                        src="/images/login.png"
                                        alt="Registration"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <div className="_social_registration_content">
                                <div className="_social_registration_right_logo _mar_b28">
                                    <img
                                        src="/images/logo.svg"
                                        alt="Logo"
                                        className="_right_logo"
                                    />
                                </div>

                                <p className="_social_registration_content_para _mar_b8">
                                    Get Started Now
                                </p>
                                <h4 className="_social_registration_content_title _titl4 _mar_b50">
                                    Log in
                                </h4>

                                <button
                                    type="button"
                                    className="_social_registration_content_btn _mar_b40"
                                    aria-label="Register with Google"
                                >
                                    <img
                                        src="/images/google.svg"
                                        alt="Google"
                                        className="_google_img"
                                    />
                                    <span>Signin With Google</span>
                                </button>

                                <div className="_social_registration_content_bottom_txt _mar_b40">
                                    <span>Or</span>
                                </div>

                                <form className="_social_registration_form">
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label
                                                    className="_social_registration_label _mar_b8"
                                                    htmlFor="email"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    className="form-control _social_registration_input"
                                                    placeholder="Enter your email"
                                                    required
                                                    value={email}
                                                    onChange={(e) =>
                                                        setField(
                                                            'email',
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label
                                                    className="_social_registration_label _mar_b8"
                                                    htmlFor="password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    className="form-control _social_registration_input"
                                                    placeholder="Enter your password"
                                                    required
                                                    value={password}
                                                    onChange={(e) =>
                                                        setField(
                                                            'password',
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                                            <div className="form-check _social_registration_form_check">
                                                <input
                                                    className="form-check-input _social_registration_form_check_input"
                                                    type="radio"
                                                    name="terms"
                                                    id="terms"
                                                    onChange={() =>
                                                        setField('agree', true)
                                                    }
                                                />
                                                <label
                                                    className="form-check-label _social_registration_form_check_label"
                                                    htmlFor="terms"
                                                >
                                                    I agree to terms &
                                                    conditions
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                                            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                                                <button
                                                    type="button"
                                                    className="_social_registration_form_btn_link _btn1"
                                                    onClick={handleSubmit}
                                                    // disabled={}
                                                >
                                                    Log in
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="_social_registration_bottom_txt">
                                            <p className="_social_registration_bottom_txt_para">
                                                Dont have an account?{' '}
                                                <a href="/register">sign up</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
