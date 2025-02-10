import styles from "./admin.module.css";

const Sidebar = ({items, onClick, selectedItem, className}) => {
    return (
        <>
            <ul className={`${styles['sidebar-list']} ${className}`}>
                {items.map(item => (
                    <li key={item.label}
                        onClick={() => onClick(item)}
                        className={`${styles['sidebar-item']} ${selectedItem.label === item.label && styles['selected']}`}>
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className={`${styles['sidebar-list-mobile']}`}>
                <select onChange={(e) => {
                    const item = JSON.parse(e.target.value);
                    onClick(item);
                }}>
                    {items.map(item => (
                        <option key={item.label}
                                value={JSON.stringify(item)}
                                className={`${selectedItem.label === item.label && styles['selected']} py-3`}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default Sidebar