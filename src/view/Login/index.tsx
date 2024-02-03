import React, { useState } from 'react';
import { useAuthLogin } from "../../hooks/AuthLogin";

interface IUsersLogin {
    username: string;
    password: string;
}

interface IPropsLogin {
    image?: string;
}

export default function Login( props : IPropsLogin){
    const { postAuthLogin } : any = useAuthLogin();
    const [disable, setDisable] = useState(false); 

    const [DataUserLogin, setDataUserLogin] = useState({
        username: '',
        password: ''
    });

    const { username, password } = DataUserLogin;

    const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDataUserLogin(DataUserLogin => ({...DataUserLogin, [name]: value}))
    }

    const checkLogin = async () => {
        try {
            setDisable(true);
            const dataUser: IUsersLogin = {
                username: username,
                password: password
            }
            await postAuthLogin(dataUser);
            if (localStorage.getItem('AuthToken') !== undefined){
                setDisable(false);
                window.location.href = '/'
            }
            setDisable(false);
        } catch(e) {
            setDisable(false);
        }
    }

    return (
        <>
                <div className="relative min-h-screen grid">
                    <div
                        className={`flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-blue-50 sm:bg-blue-100`}>
                        <div className="relative xs:h-full sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto justify-center overflow-hidden text-white bg-no-repeat bg-cover" style={{ backgroundColor: '#D4D8DA' }}>
                            <div className={'grid'}>
                                <div className="flex justify-center pr-64 pl-64 pt-6" />
                                    {/* img */}
                                <div className="w-full lg:max-w-2xl md:max-w-md pt-24 pl-8 pr-2 text-center">
                                    <div className="text-7xl font-bold leading-tight mb-6 mx-auto w-full content-center items-center" style={{ color: '#1C7CD5'}}>
                                        {/* img */}
                                        <img src={props.image ? props.image : './images/5.png' } />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex sm:p-14 md:justify-left w-full sm:bg-blue-50 sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-28 sm:rounded-lg md:rounded-none bg-blue-100">
                            <div className="max-w-xl w-full space-y-12">
                                <div>
                                    <h2 className="mt-20 text-2xl font-bold" style={{ color: '#1C7CD5'}}>
                                        Bienvenido a tu Punto de Venta
                                    </h2>
                                    <p className="mt-1 text-xs text-gray-400">
                                        ¿Necesitas un nueva cuenta? <span style={{ color: '#1C7CD5', cursor: 'pointer' }}>Registrase </span>
                                    </p>
                                </div>
                                <div>
                                    <div className="grip">
                                        <div className={'pb-6'}>
                                            <label htmlFor="usuario" className="block text-xs sm:w-80 text-gray-600">Nombre de usuario</label>
                                            <input
                                                id="usuario"
                                                onChange={onHandleInput}
                                                type="text"
                                                name="username"
                                                placeholder="Usuario"
                                                autoComplete="email"
                                                className="block w-full rounded p-3 mt-2 text-gray-700 appearance-none focus:outline-none focus:bg-gray-50 focus:shadow-inner"
                                                required/>
                                        </div>
                                        <div className={'pb-6'}>
                                            <label htmlFor="password" className="block mt-2 text-xs text-gray-600">Contraseña</label>
                                            <input
                                                id="password"
                                                type="password"
                                                onChange={onHandleInput}
                                                name="password"
                                                placeholder="Contraseña"
                                                autoComplete="current-password"
                                                className="block rounded w-full p-3 mt-2 text-gray-700 appearance-none focus:outline-none focus:bg-gray-50 focus:shadow-inner"
                                                required/>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={password === '' || username === '' || username === undefined || password === undefined || disable}
                                                onClick={checkLogin}
                                                className={`w-full rounded py-3 mt-6 tracking-widest ${ password === '' || username === '' || username === undefined || password === undefined ? 'bg-gray-400' : 'bg-blue-700' } text-white uppercase  shadow-lg focus:outline-none`}>
                                                { disable ? <>
                                                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" />
                                                    Processing...
                                                </> : 'Iniciar' }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};
