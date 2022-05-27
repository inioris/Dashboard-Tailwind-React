interface PropsIcons {
    w?: string;
    h?: string;
    class?: string;
}

const EditIcons = (props: PropsIcons) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${props.h ? props.h : 'h-10'} ${props.w ? props.w : 'w-10'} ${props.class ? props.class : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
    </svg>
);

export default EditIcons;
