import EventsIcon from './icons/Events';

const data: any = {
    principal: [
        {
            section: 'Inicio',
            icon: <EventsIcon />,
            link: '/',
        },
        {
            section: 'Nueva Venta',
            icon: <EventsIcon />,
            link: '/nueva-venta',
        },
        // {
        //     section: 'Ventas',
        //     icon: <EventsIcon />,
        //     link: '/agendas',
        // },
    ],
    mantenimiento: [
        {
            section: 'Producto y Servicio',
            icon: <EventsIcon />,
            link: '/productos-y-servicios',
        },
        {
            section: 'Facturas y servicios',
            icon: <EventsIcon />,
            link: '/faturas-y-servicios',
        },
        {
            section: 'Inventario',
            icon: <EventsIcon />,
            link: '/inventoy',
        },
        // {
        //     section: 'Proveedores',
        //     icon: <EventsIcon />,
        //     link: '/proveedores',
        // },
        // {
        //     section: 'Administracion',
        //     icon: <EventsIcon />,
        //     link: '/administracion',
        // },
    ]
};

export default data;
