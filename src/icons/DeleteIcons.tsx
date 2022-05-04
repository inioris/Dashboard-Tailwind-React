interface PropsIcons {
    w?: string;
    h?: string;
    class?: string;
}

const CancelIcons = (props: PropsIcons) => (
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
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

export default CancelIcons;