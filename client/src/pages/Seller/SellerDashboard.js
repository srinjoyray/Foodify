import React from 'react'
import {Box,Tabs,Tab} from '@mui/material';
import SellerHeader from '../../components/SellerHeader';
import SellerProfile from '../../components/SellerProfile'
import styles from '../../styles/SellerDashboard.module.css';
import SellerOrder from '../../components/SellerOrder';
import Footer from '../../components/Footer';

const SellerDashboard = ({seller,setSeller}) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={styles.dashboard}>
            <SellerHeader  seller={seller} setSeller={setSeller}  />

            <div className={styles.body}>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className={styles.tabs} variant='fullWidth'>
                        <Tab label="Profile" className={styles.tab} />
                        <Tab label="Orders" className={styles.tab} />
                    </Tabs>
                </Box>
                {
                    value === 0 ? 
                    <SellerProfile seller={seller} setSeller={setSeller} />
                    :
                    <SellerOrder seller={seller} setSeller={setSeller} />
                }
            </div>

            <Footer />
        </div>
    )
}

export default SellerDashboard