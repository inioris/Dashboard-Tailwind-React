interface PropsIcons {
    w?: string;
    h?: string;
    class?: string;
}

const CheckCircleIcons = (props: PropsIcons) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${props.h ? props.h : 'h-10'} ${props.w ? props.w : 'w-10'} ${props.class ? props.class : ''}`}
        fill="none"
        viewBox="0 0 20 20"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);

export default CheckCircleIcons;