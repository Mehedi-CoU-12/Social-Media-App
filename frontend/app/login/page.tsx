"use client";
import { useLogin } from "./useLogin";

export default function RegisterPage() {
    const { state, submit, setField } = useLogin();
    const { email, password, agree, loading, errors } = state;

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
                                                    placeholder="johndoe@example.com"
                                                    required
                                                    value={email}
                                                    onChange={(e) =>
                                                        setField(
                                                            "email",
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
                                                    required
                                                    value={password}
                                                    onChange={(e) =>
                                                        setField(
                                                            "password",
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
                                                    onChange={(e) =>
                                                        setField("agree", true)
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
                                                    onClick={submit}
                                                    disabled={loading}
                                                >
                                                    {loading
                                                        ? "Logging in..."
                                                        : "Log in"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="_social_registration_bottom_txt">
                                            <p className="_social_registration_bottom_txt_para">
                                                Don't have an account?{" "}
                                                <a href="#0">Log in</a>
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
    );
}
