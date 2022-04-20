import EventsIcon from './icons/Events';

const data: any = {
    principal: [
        {
            section: 'Home',
            icon: <EventsIcon />,
            link: '/',
        },
        {
            section: 'Pacientes',
            icon: <EventsIcon />,
            link: '/pacientes',
        },
        {
            section: 'Sucursales',
            icon: <EventsIcon />,
            link: '/sucursales',
        },
        {
            section: 'Agendas',
            icon: <EventsIcon />,
            link: '/agendas',
        },
    ],
    otros: [
        {
            section: 'Usuarios',
            icon: <EventsIcon />,
            link: '/usuarios',
        },
        {
            section: 'Facturas y servicios',
            icon: <EventsIcon />,
            link: '/faturas-y-servicios',
        },
    ]
};

export default data;
