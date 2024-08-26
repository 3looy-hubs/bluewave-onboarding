import { React } from 'react';
import styles from './PopupAppearance.module.scss';
import ColorTextField from '../../ColorTextField/ColorTextField';
import DropdownList from '../../DropdownList/DropdownList';

const PopupAppearance = ({ data = [], setPopupSize }) => {
    const handleActionChange = (newAction) => {
        setPopupSize(newAction);
      };
    return (
        <div className={styles.container}>
            {data.map(({ stateName, state, setState }) => (
                <div key={stateName}>
                    <h2>{stateName}</h2>
                    <div className={styles.color}>
                        <ColorTextField
                            value={state}
                            onChange={setState}
                        />
                    </div>
                </div>
            ))}
            <h2 style={{ marginBottom: '1rem' }}>Popup Size</h2>
            <DropdownList
                actions={['Small', 'Medium', 'Large']}
                onActionChange={handleActionChange} />
        </div>
    );
};

export default PopupAppearance;
