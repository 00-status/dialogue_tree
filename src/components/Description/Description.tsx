import './description.css';

type Props = {
    label: string
};
export const Description = (props: Props) => {
    return (
    <div className="description">
        <p>{props.label}</p>
    </div>
    );
};
